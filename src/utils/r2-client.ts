/**
 * R2 Storage URL Generator (Frontend - Read-only)
 * 
 * This frontend service only handles URL generation for displaying media.
 * All file uploads are managed by the admin dashboard.
 */

interface R2Config {
  publicUrl: string;
  devUrl?: string;
}

class R2UrlGenerator {
  private publicUrl: string;
  private devUrl?: string;

  constructor(config: R2Config) {
    this.publicUrl = config.publicUrl;
    this.devUrl = config.devUrl;
  }

  /**
   * Generate public URL for a file key
   */
  generatePublicUrl(key: string): string {
    // Remove leading slash if present
    const cleanKey = key.startsWith('/') ? key.slice(1) : key;
    
    if (this.publicUrl) {
      return `${this.publicUrl}/${cleanKey}`;
    }
    
    if (this.devUrl) {
      return `${this.devUrl}/${cleanKey}`;
    }
    
    throw new Error('No public URL configured for R2 storage');
  }

  /**
   * Get the base URL for the current environment
   */
  getBaseUrl(): string {
    return this.publicUrl || this.devUrl || '';
  }

  /**
   * Check if a URL is from R2 storage
   */
  isR2Url(url: string): boolean {
    return url.includes('cacmauritanie.mr') || 
           url.includes('cdn.cacmauritanie.mr') ||
           url.includes('pub-b49a9ad764784bc5b4b1d434f1159bf5.r2.dev') ||
           url.includes('r2.cloudflarestorage.com');
  }

  /**
   * Extract file key from R2 URL
   */
  extractKeyFromUrl(url: string): string {
    if (url.includes('cdn.cacmauritanie.mr')) {
      return url.replace('https://cdn.cacmauritanie.mr/', '');
    }
    
    if (url.includes('cacmauritanie.mr')) {
      return url.replace('https://cacmauritanie.mr/', '');
    }
    
    if (url.includes('pub-b49a9ad764784bc5b4b1d434f1159bf5.r2.dev')) {
      return url.replace('https://pub-b49a9ad764784bc5b4b1d434f1159bf5.r2.dev/', '');
    }
    
    return url;
  }
}

// Export configured instance
export const r2UrlGenerator = new R2UrlGenerator({
  publicUrl: process.env.NEXT_PUBLIC_R2_PUBLIC_URL || 'https://cacmauritanie.mr',
  devUrl: undefined, // No dev URL needed for frontend
});

export default r2UrlGenerator;