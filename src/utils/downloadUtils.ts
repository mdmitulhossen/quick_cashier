/**
 * Utility functions for handling file downloads
 */

export interface DownloadableFile {
  name: string;
  path: string;
  type: 'pdf' | 'doc' | 'docx' | 'xls' | 'xlsx' | 'txt';
  description?: string;
}

/**
 * Triggers a file download from the public assets directory
 */
export const downloadFile = (filePath: string, fileName?: string): void => {
  const link = document.createElement('a');
  link.href = filePath;
  link.download = fileName || filePath.split('/').pop() || 'download';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Downloads a file with loading state management
 */
export const downloadFileWithLoading = async (
  filePath: string, 
  fileName?: string,
  onLoadingChange?: (loading: boolean) => void
): Promise<void> => {
  try {
    onLoadingChange?.(true);
    
    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    downloadFile(filePath, fileName);
  } catch (error) {
    console.error('Download failed:', error);
    throw new Error('Download failed');
  } finally {
    onLoadingChange?.(false);
  }
};

/**
 * Available downloadable files
 */
export const downloadableFiles: Record<string, DownloadableFile> = {
  'loan-application-form': {
    name: 'Loan Application Form',
    path: '/assets/documents/loan-application-form.pdf',
    type: 'pdf',
    description: 'Official loan application form for Quick Cash'
  },
  'terms-and-conditions': {
    name: 'Terms and Conditions',
    path: '/assets/documents/terms-and-conditions.pdf',
    type: 'pdf',
    description: 'Terms and conditions for Quick Cash services'
  },
  'privacy-policy': {
    name: 'Privacy Policy',
    path: '/assets/documents/privacy-policy.pdf',
    type: 'pdf',
    description: 'Privacy policy and data protection information'
  }
};

/**
 * Gets file information by key
 */
export const getFileInfo = (key: string): DownloadableFile | undefined => {
  return downloadableFiles[key];
};

/**
 * Downloads a file by key
 */
export const downloadFileByKey = (key: string, onLoadingChange?: (loading: boolean) => void): void => {
  const fileInfo = getFileInfo(key);
  if (!fileInfo) {
    console.error(`File not found: ${key}`);
    return;
  }
  
  downloadFileWithLoading(fileInfo.path, fileInfo.name, onLoadingChange);
};
