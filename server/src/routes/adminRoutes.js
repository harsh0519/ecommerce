import express from 'express'
import auth from '../helper/auth.js'
import adminAuthController from '../controller/adminAuthController.js'
import adminUserController from '../controller/adminUserController.js'
import adminProductController from '../controller/adminProductController.js'
import productImageUpload from '../helper/productImageUpload.js'

const router = express.Router()

router.post('/login',adminAuthController.login)
router.post('/register',adminAuthController.register)
router.put('/logout/:id',adminAuthController.logout)

router.get('/allusers/:id',auth.adminAuthenticate,auth.adminGuard,adminUserController.allUsers)
router.get('/currentuser/:userId/:id',auth.adminAuthenticate,adminUserController.currentUser)
router.put('/edituser/:userId/:id',auth.adminAuthenticate,adminUserController.editUser)
router.delete('/deleteuser/:userId/:id',auth.adminAuthenticate,adminUserController.deleteUser)

router.post('/addproduct/:id', auth.adminAuthenticate,auth.adminGuard, productImageUpload.imageUpload.single('imagefile'),adminProductController.addProduct)
router.get('/getallproducts/:id', auth.adminAuthenticate, adminProductController.getAllProducts)
router.put('/editproduct/:id', auth.adminAuthenticate,productImageUpload.imageUpload.single('imagefile'), adminProductController.updateProduct)
router.delete('/deleteproduct/:id', auth.adminAuthenticate, adminProductController.removeProduct)

router.get('/getcurrentuser/:id', auth.adminAuthenticate, adminUserController.getCurrentUser)
router.put('/updatecurrentuser/:id', auth.adminAuthenticate, adminUserController.updateProfileData)

export default router