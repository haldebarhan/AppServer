const {Request, Response} = require('express')

class IndexController {
   index(req, res){
        res.render('home')
    }
}

const indexController = new IndexController()

module.exports = indexController