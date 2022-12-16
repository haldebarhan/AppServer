const mongoose = require('mongoose')

const InstitutionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nom:  {type: String},
    type: {type: String, default: ()=> "Autres"},
    ville: {type: String, default: ()=> ""}
})


module.exports = mongoose.model('Institution', InstitutionSchema)