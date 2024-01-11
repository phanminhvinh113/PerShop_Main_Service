import { ApiKeyModel, UserDecodeJWT, UserKeyModel } from '../restAPI/interface/index.interface'

declare global {
   namespace Express {
      interface Request {
         objKey?: ApiKeyModel | null
         keyStore?: UserKeyModel
         User?: UserDecodeJWT | undefined
      }
   }
}
