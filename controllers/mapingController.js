const { request, response } = require('express')
const mongoose = require('mongoose')
const Institution = require('../models/Institutions')
const Magistra = require('../models/Magistra')


class MapingController {

  async getAllIntitutions(req, res) {
      const docs = await Institution.find({})
      res.status(200).send(docs)
   }

   async getMagistraByInstitution(req, res){
      const {nom} = req.query
      const doc = await Magistra.find({institution: nom})
      res.status(200).send(doc)
   }
}

const mapingController = new MapingController()

module.exports = mapingController