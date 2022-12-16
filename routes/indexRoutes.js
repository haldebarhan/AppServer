const {Router} = require('express')
const indexController = require('../controllers/indexController')



class IndexRoutes{

router


constructor(){
    this.router = Router()
    this.config()
}


config(){
    this.router.get('/',indexController.index)
   
}

}
const indexRoute = new IndexRoutes()

module.exports = indexRoute.router