import multer from 'multer'

const productImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log("sada : ",file)
    cb(null, 'productImages')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now()
    // console.log(uniqueSuffix,file)
    cb(null, uniqueSuffix + file.originalname)
  }
})
  
const imageUpload = multer({ storage: productImageStorage })

export default {
  imageUpload
}