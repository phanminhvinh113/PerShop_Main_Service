import { Request, Response } from 'express'
import UploadService from '../service/upload.service'
import { SuccessResponse } from '../../core/success.response'
import { getImageSign, uploadImageFromLocalS3 } from '../service/aws/upload.s3.service'

class UploadController {
   uploadByUrl = async (req: Request, res: Response) => {
      try {
         return res.status(201).json(await UploadService.uploadImageByUrl(req.body))
      } catch (error) {
         return res.status(403).json({
            code: -1,
            status: error.status,
            message: error?.message,
         })
      }
   }
   uploadFile = async (req: Request, res: Response) => {
      new SuccessResponse({
         message: 'upload successfully',
         data: await UploadService.uploadFileFromLocal({
            path: req.file?.path,
            folderName: req.body.folderName,
            sizes: req.body.sizes,
         }),
      }).send(res)
   }
   uploadImage = async (req: Request, res: Response) => {
      new SuccessResponse({
         message: 'upload successfully',
         data: await UploadService.uploadImageByFile({
            buffer: req.file?.buffer,
            fileName: req.body.fileName,
            folderName: req.body.folderName,
         }),
         statusCode: res.statusCode,
      }).send(res)
   }
   uploadS3Image = async (req: Request, res: Response) => {
      console.log({ buffer: req.file?.buffer })
      new SuccessResponse({
         message: 'upload s3 successfully',
         data: await uploadImageFromLocalS3({
            buffer: req.file?.buffer,
         }),
         statusCode: res.statusCode,
      }).send(res)
   }
   getImageSign = async (req: Request, res: Response) => {
      console.log({ param: req.query })
      const image_key: string = req.query.image_key as string

      new SuccessResponse({
         message: 'succeed',
         data: await getImageSign({
            image_key,
         }),
         statusCode: res.statusCode,
      }).send(res)
   }
}

export default new UploadController()
