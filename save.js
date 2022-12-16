const mongoose = require('mongoose')
const Magistra = require('./models/Magistra')
const User = require('./models/user')
const bcrypt = require('bcrypt')

const Save = async () => {
    const user = new User({
        _id: new mongoose.Types.ObjectId,
        username: 'test',
        password: 'test',
    })
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    user.save().then(()=> console.log('saved')).catch(err => console.log(err))

}






module.exports = Save