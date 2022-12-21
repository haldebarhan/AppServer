const { Router } = require('express')
const userController = require('../controllers/usersController')
const upload = require('../middlewares/multer')


class UserRoutes {

        router


    constructor() {

        this.router = Router()
        this.config()

    }


    config() {
        this.router.get('/users', userController.getPaginatedUser)
        this.router.get('/filter', userController.getFilteredUsers)
        this.router.post('/user', userController.upadteOneUserByAdmin)
        this.router.post('/user/self', upload.single('file'), userController.upadteOneUserBySelf)
        this.router.post('/newuser', userController.newUser)
        this.router.post('/newadmin', userController.newAdmin)
        this.router.get('/:matricule', userController.getOne)
        this.router.delete('/:matricule', userController.removeOneUser)
    }

}
const userRoute = new UserRoutes
module.exports = userRoute.router