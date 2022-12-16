const {Request, Response} = require('express')

class IndexController {
   index(req, res){
        res.render('home')
    }

    login(req, res){
        res.send(req.body)
    }
}

const indexController = new IndexController()

module.exports = indexController