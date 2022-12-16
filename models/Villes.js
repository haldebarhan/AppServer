const mongoose = require('mongoose')

const VillesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    city:  {type: String},
    lat: {type: Number},
    lng: {type: Number},
    admin_name: {type: String},
    population: {type: String},
})


module.exports = mongoose.model('Villes', VillesSchema)