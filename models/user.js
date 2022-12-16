const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['ADMIN', 'USER'], default: ()=> 'USER'},
    owner: {type: String}
})

module.exports = mongoose.model('User', UserSchema)