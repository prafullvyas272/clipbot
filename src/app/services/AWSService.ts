import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

interface UploadToS3Params {
  fileBuffer: Buffer | Uint8Array | Blob | string;
  fileName: string;
  contentType: string;
}

export async function uploadToS3({
  fileBuffer,
  fileName,
  contentType,
}: UploadToS3Params): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME as string,
    Key: fileName,
    Body: fileBuffer,
    ContentType: contentType,
  });

  await s3.send(command);

  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
}
