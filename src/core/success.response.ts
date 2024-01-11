import { ReasonStatusCode, StatusCode } from '../utils/constant'
import { Response } from 'express'
//
interface ResponseType {
   message: string
   statusCode?: number
   reasonStatusCode?: string
   data: any
}
//
export class SuccessResponse {
   //
   message: string
   status: number
   reasonStatusCode: string
   data: any
   //
   constructor({ message, statusCode = StatusCode.SUCCESS, reasonStatusCode = ReasonStatusCode.SUCCESS, data = {} }: ResponseType) {
      this.message = !message ? reasonStatusCode : message
      this.status = statusCode
      this.data = data
   }
   public send(res: Response, _headers: object = {}) {
      return res.status(this.status).json(this)
   }
}
export class SUCCESS extends SuccessResponse {
   constructor({ message, data }: ResponseType) {
      super({ message, data })
   }
}

export class COMPLETED extends SuccessResponse {
   constructor({ message, statusCode = StatusCode.COMPLETED, reasonStatusCode = ReasonStatusCode.COMPLETED, data }: ResponseType) {
      super({ message, statusCode, data, reasonStatusCode })
   }
}
