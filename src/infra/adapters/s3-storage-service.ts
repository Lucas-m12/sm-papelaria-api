import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { StorageService } from "../../domain/interfaces/storage-service";

export class S3StorageService implements StorageService {
  #s3Client: S3Client;

  constructor() {
    this.#s3Client = new S3Client({});
  } 

  async getPresignedUploadUrl(bucketName: string, fileKey: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
    });
    const url = await getSignedUrl(this.#s3Client, command, { expiresIn: 60 });
    return url;
  }

  async deleteFile(bucketName: string, fileKey: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
    });
    await this.#s3Client.send(command);
  }

  getFileUrl(bucketName: string, fileKey: string): Promise<string> {
    return Promise.resolve(`https://${bucketName}.s3.amazonaws.com/${fileKey}`);
  }
}