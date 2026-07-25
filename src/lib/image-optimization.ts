/**
 * Image Optimization Utilities for Peony Collective
 * Handles Supabase Storage transformation parameters, WebP/AVIF formatting, and image sizing.
 */

export interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'origin' | 'webp' | 'avif';
  resize?: 'cover' | 'contain' | 'fill';
}

/**
 * Generates an optimized Supabase storage URL with CDN transformation query parameters.
 */
export function getOptimizedImageUrl(
  originalUrl: string | undefined | null,
  options: ImageTransformOptions = {}
): string {
  if (!originalUrl) {
    return '/icon.png';
  }

  // If it's a Supabase storage URL, append transformation parameters
  if (originalUrl.includes('supabase.co/storage/v1/object/public/')) {
    const { width = 800, height, quality = 80, format = 'webp', resize = 'cover' } = options;
    const renderUrl = originalUrl.replace(
      '/storage/v1/object/public/',
      '/storage/v1/render/image/public/'
    );
    const params = new URLSearchParams();
    if (width) params.set('width', width.toString());
    if (height) params.set('height', height.toString());
    params.set('quality', quality.toString());
    params.set('format', format);
    params.set('resize', resize);

    return `${renderUrl}?${params.toString()}`;
  }

  return originalUrl;
}

/**
 * Checks if a file is an HEIC/HEIF image format (Apple Live Photos / Camera defaults)
 */
export function isHeicFile(filename: string): boolean {
  return /\.heic$|\.heif$/i.test(filename);
}

/**
 * Returns responsive image sizes string for Next.js Image component
 */
export function getResponsiveImageSizes(type: 'card' | 'hero' | 'thumbnail' | 'gallery'): string {
  switch (type) {
    case 'thumbnail':
      return '(max-width: 640px) 100px, 150px';
    case 'card':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 'gallery':
      return '(max-width: 768px) 100vw, 50vw';
    case 'hero':
      return '100vw';
    default:
      return '100vw';
  }
}
