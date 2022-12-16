const {Router} = require('express')
const authController = require('../controllers/authController')
const upload = require('../middlewares/multer')

class AuthRoutes{

router


constructor(){

    this.router = Router()
    this.config()

}


config(){
    this.router.post('/signup', upload.single('file'), authController.signup)
    this.router.get('/verify/:username', authController.verifyUserusername)
    this.router.post('/login', authController.login)
    this.router.get('/:matricule', authController.verifyUserMatricule)
}

}
const authRoute = new AuthRoutes
module.exports =  authRoute.router