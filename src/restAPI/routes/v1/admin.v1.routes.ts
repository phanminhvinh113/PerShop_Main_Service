import express from 'express'
import { AuthenticationAdmin } from '../../../auth/auth.utils'
const route = express.Router()
//
route.use('/', AuthenticationAdmin)
//
route.get('/get-all-user', (_req: any, res: any) => {
   res.status(200).json({
      code: 0,
      data: [],
   })
})

//
module.exports = route
