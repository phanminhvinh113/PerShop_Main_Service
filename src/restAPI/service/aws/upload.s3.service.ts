import { PutObjectCommand } from '@aws-sdk/client-s3'
import { BadRequestError, ConflictRequestError } from '../../../core/error.response'
import { s3 } from '../../../configs/aws.s3.config'
import { generateRandomByte } from '../../../utils/helper'
import { getSignedUrl } from '@aws-sdk/cloudfront-signer' //CJS
require('dotenv').config()

export const uploadImageFromLocalS3 = async ({ buffer }: { buffer: Buffer | undefined }) => {
   try {
      if (!buffer) throw new BadRequestError('upload filed!')

      const keyImageName = generateRandomByte(16)

      const command = new PutObjectCommand({
         Bucket: process.env.AWS_BUCKET_S3_NAME || 'per-shop-s3',
         Key: keyImageName,
         Body: buffer,
         ContentType: 'image/jpeg',
      })

      const result = await s3.send(command)

      const url = `${process.env.AWS_URL_CLOUDFRONT}/${keyImageName}`
      const keyPairId = process.env.AWS_CLOUDFRONT_NAME_PUBLIC_KEY || ''
      const timeExpire = new Date(Date.now() + 1000 * 60).toString() // expire after 60s
      const privateKey = process.env.AWS_CLOUDFRONT_PRIVATE_KEY_ID || ''

      const urlSigned = getSignedUrl({
         url,
         keyPairId,
         dateLessThan: timeExpire,
         privateKey,
      })

      if (!result) throw new ConflictRequestError('Upload Failed')

      return { urlSigned, result, image_key: keyImageName }
   } catch (error) {
      return error
   }
}

export const getImageSign = async ({ image_key }: { image_key: string }) => {
   try {
      if (!image_key) throw new BadRequestError('missing parameter')

      const url = `${process.env.AWS_URL_CLOUDFRONT}/${image_key}`
      const keyPairId = process.env.AWS_CLOUDFRONT_NAME_PUBLIC_KEY || ''
      const timeExpire = new Date(Date.now() + 1000 * 60).toString() // expire after 60s
      const privateKey = process.env.AWS_CLOUDFRONT_PRIVATE_KEY_ID || ''

      const urlSigned = getSignedUrl({
         url,
         keyPairId,
         dateLessThan: timeExpire,
         privateKey,
      })

      if (!urlSigned) throw new ConflictRequestError('Access Denied')

      return { url: urlSigned, timeExpire }
   } catch (error) {
      return error
   }
}
