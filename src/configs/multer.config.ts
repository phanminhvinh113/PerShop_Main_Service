//import { Request } from 'express'
import multer, { Multer } from 'multer'

// Set storage engine
// const storage = multer.diskStorage({
//    destination: (_req, _file, callback) => {
//       callback(null, './src/uploads') // Set the destination folder for uploaded files
//    },
//    filename: (_req, file, callback) => {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
//       const extension = path.extname(file.originalname)
//       callback(null, file.fieldname + '-' + uniqueSuffix + extension) // Set the file name
//    },
// })
// Set storage engine to use memory storage

const storageMemory = multer.memoryStorage()

// File filter to allow only certain file types
// const fileFilter = (_req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
//    const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg']

//    if (allowedFileTypes.includes(file.mimetype)) {
//       callback(null, true)
//    } else {
//       callback(new Error('Invalid file type. Only JPEG, PNG,JPG,and GIF are allowed.'))
//    }
// }

// Create Multer instance with configuration
const multerConfig: Multer = multer({
   storage: storageMemory,
   //fileFilter: fileFilter,
   limits: {
      fileSize: 1024 * 1024 * 5, // Set a file size limit (here, 5MB)
   },
})

export default multerConfig
