export const storageFolders = {
  // User content
  avatars: 'users/avatars',
  profiles: 'users/profiles',
  
  // Product content
  products: 'products/images',
  productDocs: 'products/documents',
  
  // Order & Payment
  payments: 'orders/payments',
  receipts: 'orders/receipts',
  
  // General uploads
  documents: 'documents',
  temp: 'temp',
  
  // Media
  images: 'media/images',
  videos: 'media/videos',
  audio: 'media/audio',
  
  // CAC specific folders
  services: 'services/images',
  projects: 'projects/images',
  gallery: 'gallery',
  testimonials: 'testimonials/images',
  team: 'team/images',
  certificates: 'certificates',
  presentations: 'presentations',
} as const;

export type StorageFolder = keyof typeof storageFolders;

export function generateFilePath(
  folder: StorageFolder,
  fileName: string,
  options: {
    userId?: string;
    entityId?: string;
    timestamp?: boolean;
    preserveExtension?: boolean;
  } = {}
): string {
  const basePath = storageFolders[folder];
  const timestamp = options.timestamp ? `-${Date.now()}` : '';
  
  let path = basePath;
  
  if (options.userId) {
    path += `/${options.userId}`;
  }
  
  if (options.entityId) {
    path += `/${options.entityId}`;
  }
  
  // Clean filename and add timestamp
  const cleanFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  
  if (options.preserveExtension) {
    const extension = cleanFileName.substring(cleanFileName.lastIndexOf('.'));
    const nameWithoutExt = cleanFileName.substring(0, cleanFileName.lastIndexOf('.'));
    const finalFileName = `${nameWithoutExt}${timestamp}${extension}`;
    return `${path}/${finalFileName}`;
  } else {
    const finalFileName = `${cleanFileName}${timestamp}`;
    return `${path}/${finalFileName}`;
  }
}

export function getFileExtension(fileName: string): string {
  return fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
}

export function isImageFile(fileName: string): boolean {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'];
  return imageExtensions.includes(getFileExtension(fileName));
}

export function isVideoFile(fileName: string): boolean {
  const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv'];
  return videoExtensions.includes(getFileExtension(fileName));
}

export function isDocumentFile(fileName: string): boolean {
  const documentExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'];
  return documentExtensions.includes(getFileExtension(fileName));
}