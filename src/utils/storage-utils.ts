import { r2UrlGenerator } from './r2-client';

export function isFirebaseStorageUrl(url: string): boolean {
  return url.includes('firebasestorage.googleapis.com');
}

export function isR2StorageUrl(url: string): boolean {
  return r2UrlGenerator.isR2Url(url);
}

export function getStorageProvider(url: string): 'firebase' | 'r2' | 'unknown' {
  if (isFirebaseStorageUrl(url)) {
    return 'firebase';
  }
  
  if (isR2StorageUrl(url)) {
    return 'r2';
  }
  
  return 'unknown';
}

export function convertFirebaseToR2Path(firebaseUrl: string): string {
  try {
    // Extract the encoded path from Firebase URL
    // Example: https://firebasestorage.googleapis.com/v0/b/bucket/o/path%2Fto%2Ffile.jpg?alt=media&token=...
    const url = new URL(firebaseUrl);
    const pathSegments = url.pathname.split('/');
    const encodedPath = pathSegments[pathSegments.length - 1];
    
    // Decode the path
    const decodedPath = decodeURIComponent(encodedPath);
    
    return decodedPath;
  } catch (error) {
    console.error('Error converting Firebase URL to R2 path:', error);
    return '';
  }
}

export function generateR2UrlFromFirebase(firebaseUrl: string): string {
  const r2Path = convertFirebaseToR2Path(firebaseUrl);
  if (!r2Path) {
    return firebaseUrl; // Return original if conversion fails
  }
  
  return r2UrlGenerator.generatePublicUrl(r2Path);
}

export function migrateImageUrls(urls: string[]): Array<{ original: string; r2: string; migrated: boolean }> {
  return urls.map(url => {
    if (isFirebaseStorageUrl(url)) {
      try {
        const r2Url = generateR2UrlFromFirebase(url);
        return {
          original: url,
          r2: r2Url,
          migrated: true
        };
      } catch (error) {
        console.error('Failed to migrate URL:', url, error);
        return {
          original: url,
          r2: url,
          migrated: false
        };
      }
    } else if (isR2StorageUrl(url)) {
      return {
        original: url,
        r2: url,
        migrated: true
      };
    } else {
      return {
        original: url,
        r2: url,
        migrated: false
      };
    }
  });
}

export function getOptimizedImageUrl(
  url: string,
  width?: number,
  quality?: number
): string {
  const provider = getStorageProvider(url);
  
  if (provider === 'firebase') {
    // Firebase URLs are already handled by imageKitLoader
    return url;
  }
  
  if (provider === 'r2') {
    // R2 URLs are handled by imageKitLoader
    return url;
  }
  
  // For other URLs, return as-is
  return url;
}

/**
 * Generate R2 URL for a given file key
 * Note: File uploads are handled by the admin dashboard
 */
export function generateR2Url(key: string): string {
  return r2UrlGenerator.generatePublicUrl(key);
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size?: number;
  createdAt?: Date;
  thumbnailUrl?: string;
}

export function normalizeMediaItem(item: any): MediaItem {
  return {
    id: item.id || item.name || Date.now().toString(),
    name: item.name || 'Untitled',
    url: item.url || '',
    type: item.type || (item.url?.includes('video') ? 'video' : 'image'),
    size: item.size,
    createdAt: item.createdAt ? new Date(item.createdAt) : undefined,
    thumbnailUrl: item.thumbnailUrl,
  };
}

export function sortMediaItems(items: MediaItem[], sortBy: 'name' | 'date' | 'size' = 'date'): MediaItem[] {
  return [...items].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'size':
        return (b.size || 0) - (a.size || 0);
      case 'date':
      default:
        if (!a.createdAt && !b.createdAt) return 0;
        if (!a.createdAt) return 1;
        if (!b.createdAt) return -1;
        return b.createdAt.getTime() - a.createdAt.getTime();
    }
  });
}

export function filterMediaItems(items: MediaItem[], type?: 'image' | 'video' | 'document'): MediaItem[] {
  if (!type) return items;
  return items.filter(item => item.type === type);
}