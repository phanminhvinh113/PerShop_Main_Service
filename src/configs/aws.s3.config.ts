import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3'
require('dotenv').config()

const s3Config: S3ClientConfig = {
   region: 'ap-southeast-1',
   credentials: {
      accessKeyId: process.env.AWS_BUCKET_S3_ACCESSKEY || ' ',
      secretAccessKey: process.env.AWS_BUCKET_S3_SECRET || ' ',
   },
}

export const s3 = new S3Client(s3Config)
