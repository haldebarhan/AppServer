const mongoose = require('mongoose')

const MagistraSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    matricule: { type: String, required: false, default: () => "" },
    nom: { type: String, required: false, default: () => "" },
    prenoms: { type: String, required: false, default: () => "" },
    contact: { type: String, required: false, default: () => "" },
    email: { type: String, required: false, default: () => "" },
    fonction: { type: String, required: false, default: () => "" },
    grade: { type: String, required: false, default: () => "" },
    dateGrade: { type: String, required: false, default: () => "" },
    daG: { type: String, required: false, default: () => "" },
    daF: { type: String, required: false, default: () => "" },
    avatar: { type: String, default: () => "" },
    institution: { type: String, default: () => "EN ATTENTE D'AFFECTATION" },
})


module.exports = mongoose.model('Magistra', MagistraSchema)