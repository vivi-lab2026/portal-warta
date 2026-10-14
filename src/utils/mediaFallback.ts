/**
 * Zero Broken Image Fallback and SVG Placeholder Generator
 */

export function getFallbackImage(category: string, title?: string): string {
  const cat = (category || '').toLowerCase();
  
  if (cat.includes('peradilan') || cat.includes('mk') || cat.includes('mahkamah')) {
    return 'https://images.unsplash.com/photo-1453733197781-3082240e7de5?w=1000&auto=format&fit=crop&q=80';
  }
  if (cat.includes('kejaksaan') || cat.includes('korupsi') || cat.includes('tipikor')) {
    return 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1000&auto=format&fit=crop&q=80';
  }
  if (cat.includes('kriminal') || cat.includes('polisi') || cat.includes('kepolisian')) {
    return 'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=1000&auto=format&fit=crop&q=80';
  }
  if (cat.includes('pendidikan') || cat.includes('guru')) {
    return 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1000&auto=format&fit=crop&q=80';
  }
  if (cat.includes('investigasi')) {
    return 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1000&auto=format&fit=crop&q=80';
  }
  if (cat.includes('opini')) {
    return 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1000&auto=format&fit=crop&q=80';
  }
  return 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1000&auto=format&fit=crop&q=80';
}

/**
 * Handle image load error smoothly by replacing with SVG canvas data URI
 */
export function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>, category: string = 'Hukum') {
  const target = e.currentTarget;
  target.onerror = null; // Prevent loop
  target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%231e293b"/><stop offset="50%" stop-color="%230f172a"/><stop offset="100%" stop-color="%231e1b4b"/></linearGradient><linearGradient id="rb" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%23ef4444"/><stop offset="25%" stop-color="%23f59e0b"/><stop offset="50%" stop-color="%2310b981"/><stop offset="75%" stop-color="%233b82f6"/><stop offset="100%" stop-color="%238b5cf6"/></linearGradient></defs><rect width="800" height="450" fill="url(%23g)"/><rect y="442" width="800" height="8" fill="url(%23rb)"/><circle cx="400" cy="190" r="64" fill="none" stroke="%23f59e0b" stroke-width="3" opacity="0.4"/><path d="M400,145 L400,235 M360,170 L440,170 M350,205 L370,170 L390,205 Z M410,205 L430,170 L450,205 Z M375,235 L425,235" stroke="%23fbbf24" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="400" y="295" font-family="sans-serif" font-weight="700" font-size="24" fill="%23ffffff" text-anchor="middle" letter-spacing="2">WARTA HUKUM</text><text x="400" y="328" font-family="sans-serif" font-weight="500" font-size="14" fill="%2394a3b8" text-anchor="middle">Dokumentasi Jurnalistik &amp; Fakta Hukum</text></svg>`;
}

export function formatDateIndonesian(dateString: string): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Jakarta'
    }).format(d) + ' WIB';
  } catch {
    return dateString;
  }
}

export function formatShortDateIndonesian(dateString: string): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'Asia/Jakarta'
    }).format(d);
  } catch {
    return dateString;
  }
}
