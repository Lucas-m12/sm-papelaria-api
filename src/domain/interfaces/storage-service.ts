export interface StorageService {
  getPresignedUploadUrl(bucketName: string, fileKey: string): Promise<string>;
  deleteFile(bucketName: string, fileKey: string): Promise<void>;
  getFileUrl(bucketName: string, fileKey: string): Promise<string>;
}
