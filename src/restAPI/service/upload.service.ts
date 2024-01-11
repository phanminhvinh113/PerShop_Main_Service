import { BadRequestError, ConflictRequestError } from '../../core/error.response'
import cloudinary from '../../configs/cloudinary.config'
import { generateRandomByte } from './../../utils/helper'

class UploadService {
   public async uploadImageByUrl({ url, folderName, fileName }: { url: string; folderName: string; fileName: string }) {
      try {
         if (!url || !folderName || !fileName) throw new BadRequestError('Missing Argument')

         const result = await cloudinary.uploader.upload(url, {
            public_id: fileName + generateRandomByte(16),
            folder: folderName,
         })

         if (!result) throw new ConflictRequestError('Upload Failed')

         return result
      } catch (error) {
         console.error('Error Upload', error)
         return error
      }
   }
   public async uploadFileFromLocal({
      path,
      folderName,

      sizes,
   }: {
      path: string | undefined
      folderName: string
      sizes: string
   }) {
      try {
         if (!path) throw new BadRequestError("Can't Find File")

         const sizesArray: number[] = sizes ? JSON.parse(sizes) : []

         const result = await cloudinary.uploader.upload(path, {
            public_id: generateRandomByte(16),
            folder: folderName,
         })

         const uploadPromises = sizesArray.map(async (requestedSize: number) => {
            return {
               url: await cloudinary.url(result.public_id, {
                  height: requestedSize,
                  width: requestedSize,
                  format: 'jpg',
               }),
               size: requestedSize,
            }
         })

         const results = await Promise.all(uploadPromises)

         if (!results) throw new ConflictRequestError('Upload Failed')

         return results
      } catch (error) {
         return error
      }
   }
   public async uploadImageByFile({ buffer, fileName, folderName }: { buffer: Buffer | undefined; fileName: string; folderName: string }) {
      try {
         if (!buffer) throw new BadRequestError("Can't Find File")

         // Upload the image to Cloudinary
         const result = await cloudinary.uploader.upload(buffer.toString('base64'), {
            public_id: fileName,
            folder: folderName,
         })

         // You can now use the Cloudinary 'result' object to get details about the uploaded image
         console.log(result)
         return result
      } catch (error) {
         return error
      }
   }
}
export default new UploadService()
