const fs = require('fs');

function cleanStyles(styleStr) {
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

  // fix email
  res = res.replace(/<a class="break-all hover:text-honey" href="\/cdn-cgi\/l\/email-protection[^>]*>[\s\S]*?<\/a>/, `<a className="break-all hover:text-honey" href="mailto:teddypupsadmin@gmail.com">teddypupsadmin@gmail.com</a>`);

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

const raw = fs.readFileSync('/tmp/raw_footer.html', 'utf8');
const cleaned = cleanHtml(raw);

const code = `'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    ${cleaned}
  );
}
`;

fs.writeFileSync('components/Footer.tsx', code);
console.log('Successfully generated components/Footer.tsx from raw_footer.html! Length:', code.length);
