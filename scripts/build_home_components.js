const fs = require('fs');
const path = require('path');

function cleanStyles(styleStr) {
  if (styleStr.includes('data:')) {
    if (styleStr.includes('position:absolute')) {
      return '{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, right: 0, bottom: 0, objectFit: "cover" } as React.CSSProperties';
    } else {
      return '{ width: "100%", height: "auto", display: "block" } as React.CSSProperties';
    }
  }

  const obj = {};
  styleStr.split(';').forEach(pair => {
    let [k, ...vParts] = pair.split(':');
    if (!k || vParts.length === 0) return;
    k = k.trim();
    let v = vParts.join(':').trim();
    if (!k || !v) return;
    if (k.startsWith('--')) {
      obj[k] = v;
    } else {
      const camelK = k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      obj[camelK] = v;
    }
  });
  return '({' + JSON.stringify(obj).slice(1, -1) + '}) as React.CSSProperties';
}

function cleanHtml(html) {
  let res = html.trim();
  if (res.startsWith('data-section=')) {
    res = '<div ' + res;
  }
  if (res.endsWith('</div><div')) {
    res = res.substring(0, res.length - 4);
  }
  if (!res.endsWith('</div>')) {
    res = res + '</div>';
  }

  // remove HTML comments
  res = res.replace(/<!--[\s\S]*?-->/g, '');

  // clean styles
  res = res.replace(/\bstyle="([^"]*)"/g, (m, content) => {
    return `style={${cleanStyles(content)}}`;
  });

  // attributes
  res = res.replace(/\bclass="/g, 'className="');
  res = res.replace(/\btabindex="/g, 'tabIndex="');
  res = res.replace(/\bautocomplete="/g, 'autoComplete="');
  res = res.replace(/\bfor="/g, 'htmlFor="');
  res = res.replace(/\bfill-rule="/g, 'fillRule="');
  res = res.replace(/\bclip-rule="/g, 'clipRule="');
  res = res.replace(/\bstroke-width="/g, 'strokeWidth="');
  res = res.replace(/\bstroke-linecap="/g, 'strokeLinecap="');
  res = res.replace(/\bstroke-linejoin="/g, 'strokeLinejoin="');
  res = res.replace(/\bstroke-dasharray="/g, 'strokeDasharray="');
  res = res.replace(/\bfetchpriority="/gi, 'fetchPriority="');
  res = res.replace(/\bpatternunits="/gi, 'patternUnits="');
  res = res.replace(/\bpreservespectratio="/gi, 'preserveAspectRatio="');
  res = res.replace(/\bviewbox="/gi, 'viewBox="');

  // boolean media attributes
  res = res.replace(/\b(muted|loop|playsinline|playsInline|autoplay|autoPlay|controls)=""/gi, '$1={true}');

  // image src normalization from /_next/image?url=...
  res = res.replace(/srcSet="[^"]*"/g, '');
  res = res.replace(/sizes="[^"]*"/g, '');
  res = res.replace(/src="\/_next\/image\?url=([^&"]+)&amp;[^"]*"/g, (m, u) => {
    return `src="${decodeURIComponent(u)}"`;
  });
  res = res.replace(/src="\/_next\/image\?url=([^&"]+)"/g, (m, u) => {
    return `src="${decodeURIComponent(u)}"`;
  });

  // remove data-nimg
  res = res.replace(/\bdata-nimg="[^"]*"/g, '');

  // ONLY self-close <img>, <input>, <br>, <hr>
  const voidTags = ['img', 'input', 'br', 'hr'];
  voidTags.forEach(tag => {
    const regex = new RegExp('<' + tag + '(\\b[^>]*?)(?<!\\/)>', 'gi');
    res = res.replace(regex, '<' + tag + '$1 />');
  });

  // entities
  res = res.replace(/&#x27;/g, "'");
  res = res.replace(/&amp;/g, '&');
  res = res.replace(/&quot;/g, '"');

  return res;
}

const sections = [
  { id: 'hero', name: 'HomeHero' },
  { id: 'meet', name: 'HomeMeet' },
  { id: 'paths', name: 'HomePaths' },
  { id: 'journey', name: 'HomeJourney' },
  { id: 'trust', name: 'HomeTrust' },
  { id: 'families', name: 'HomeFamilies' },
  { id: 'questions', name: 'HomeQuestions' },
  { id: 'cta', name: 'HomeCta' }
];

for (const s of sections) {
  const filePath = `/tmp/section_${s.id}.html`;
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    continue;
  }
  let raw = fs.readFileSync(filePath, 'utf8');
  if (s.id === 'cta') {
    const endIdx = raw.indexOf('</section></div>');
    if (endIdx !== -1) {
      raw = raw.substring(0, endIdx + 16);
    }
  }

  let cleaned = cleanHtml(raw);

  // If questions, let's enhance it with state for interactive accordion
  let extraLogic = '';
  if (s.id === 'questions') {
    extraLogic = `
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const toggleIndex = (idx: number) => {
    setOpenIndex(prev => prev === idx ? null : idx);
  };
`;
    let qaCount = 0;
    cleaned = cleaned.replace(/<div className="tp-qa"[^>]*>([\s\S]*?)<\/div>/g, (full, inner) => {
      const idx = qaCount++;
      const qMatch = inner.match(/<dt className="font-plush tp-qa__q">([\s\S]*?)<\/dt>/);
      const aMatch = inner.match(/<dd className="tp-qa__a">([\s\S]*?)<\/dd>/);
      if (qMatch && aMatch) {
        return `<div className="tp-qa cursor-pointer select-none transition-all duration-300" onClick={() => toggleIndex(${idx})}>
            <dt className="font-plush tp-qa__q flex items-center justify-between gap-4">
              <span className="flex items-center gap-3">${qMatch[1]}</span>
              <span className="text-honey text-xl transform transition-transform duration-300 font-bold" style={{ transform: openIndex === ${idx} ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
            </dt>
            {openIndex === ${idx} && (
              <dd className="tp-qa__a mt-3 text-milk/90 leading-relaxed animate-fadeIn">
                ${aMatch[1]}
              </dd>
            )}
          </div>`;
      }
      return full;
    });
  }

  const code = `'use client';

import React from 'react';
import Link from 'next/link';

export default function ${s.name}() {
  ${extraLogic}
  return (
    ${cleaned}
  );
}
`;

  const outPath = path.join(process.cwd(), 'components', 'home', `${s.name}.tsx`);
  fs.writeFileSync(outPath, code);
  console.log(`Generated ${outPath} (${code.length} bytes)`);
}
