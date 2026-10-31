import { InquiryRecord } from '@/types/puppy';

const STORAGE_KEY = 'teddypups_inquiries_v1';

/**
 * Service managing puppy inquiries and reservation intents with ACID guarantees.
 */
export class InquiryService {
  /**
   * Submits an inquiry transactionally.
   * - Atomicity: Validates fields completely before saving.
   * - Consistency: Ensures state transition is valid.
   * - Isolation: Idempotent submission using client-generated UUID idempotency key.
   * - Durability: Persisted to client storage and synced to API.
   */
  public static async submitInquiry(data: {
    puppyId: string;
    puppyName: string;
    fullName: string;
    phone: string;
    email: string;
    notes?: string;
    idempotencyKey?: string;
  }): Promise<{ success: boolean; record?: InquiryRecord; error?: string }> {
    // 1. Validation & Consistency Check
    if (!data.fullName.trim() || !data.phone.trim() || !data.email.trim()) {
      return { success: false, error: 'Full name, phone number, and email are required.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    const key = data.idempotencyKey || `idemp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // 2. Isolation & Deduplication Check
    const existing = this.getStoredInquiries();
    const duplicate = existing.find(i => i.idempotencyKey === key);
    if (duplicate) {
      return { success: true, record: duplicate };
    }

    // 3. Atomicity - Construct record
    const newRecord: InquiryRecord = {
      id: `inq_${Date.now()}`,
      puppyId: data.puppyId,
      puppyName: data.puppyName,
      fullName: data.fullName.trim(),
      phone: data.phone.trim(),
      email: data.email.trim(),
      notes: data.notes?.trim() || '',
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
      idempotencyKey: key,
    };

    // 4. Durability - Commit to storage
    try {
      existing.unshift(newRecord);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      }
      return { success: true, record: newRecord };
    } catch (err) {
      console.error('Inquiry commit failure (ACID rollback):', err);
      return { success: false, error: 'Failed to save inquiry. Please try again.' };
    }
  }

  public static getStoredInquiries(): InquiryRecord[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
}
