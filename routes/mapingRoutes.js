const {Router} = require('express')
const mapingController = require('../controllers/mapingController')


class MapingRoutes{

router


constructor(){
    this.router = Router()
    this.config()
}


config(){
    this.router.get('/', mapingController.getAllIntitutions)
    this.router.get('/palais', mapingController.getMagistraByInstitution)
   
}

}
const mapingRoutes = new MapingRoutes()

module.exports = mapingRoutes.router