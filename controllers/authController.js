const bcrypt = require('bcrypt')
const Magistra = require('../models/Magistra')
const mongoose = require('mongoose')
const User = require('../models/user')
const fileGuard = require('../images/fileGuard')

class AuthController {
    async login(req, res) {
        const { username, password } = req.body
        const user = await User.findOne({ username: username })
        if (user) {
            bcrypt.compare(password, user.password, async (err, isValid) => {
                if (isValid) {
                    if (user.owner) {
                        User.aggregate([
                            { $match: { owner: user.owner.toString() } },
                            {
                                $lookup: {
                                    from: "magistras",
                                    localField: "owner",
                                    foreignField: "matricule",
                                    as: "user"
                                }
                            },
                            {
                                $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$user", 0] }, "$$ROOT"] } }
                            },
                            { $project: { user: 0, __v: 0, username: 0, password: 0, _id: 0, owner: 0 } }
                        ]).then(response => res.status(200).json({data: response}))
                    } else {
                        const response = { role: 'ADMIN' }
                        res.status(201).json({data: response})
                    }
                } else res.status(202).send('Mot de pass incorrect')

            })
        } else res.status(203).send("Nom d'utilisateur incorrect")
    }

    async signup(req, res) {
        const { matricule, password, username, } = req.body
        const user = await User.findOne({ owner: matricule })
        if (user) {
            res.status(200).send('Vous etes deja inscrit')
        }
        else {
            const salt = await bcrypt.genSalt(10)
            const CryptedPassword = await bcrypt.hash(password, salt)
            const mag = await Magistra.findOne({ matricule: matricule })
            if (mag.avatar) {
                fileGuard(mag.avatar.toString())
            }
            Magistra.updateOne(
                { matricule: matricule },
                {
                    $set:
                    {
                        avatar: req.file ? req.file.filename : "",
                    }
                })
                .then(() => {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId,
                        username: username,
                        password: CryptedPassword,
                        owner: matricule
                    })
                    user.save()
                        .then(() => res.status(201).send("enregistrement terminé"))
                        .catch(err => res.send(err))
                })
                .catch(err => res.send(err))
        }


    }

    async verifyUserMatricule(req, res) {
        const user = await Magistra.findOne({ matricule: req.params.matricule })
        if (user) res.status(200).send(user.matricule)
        else res.status(201).send('Matricule incorrect')
    }

    async verifyUserusername(req, res) {
        const user = await User.findOne({ username: req.params.username })
        if (user) res.status(200).send('Ce nom est deja utilisé')
        else res.status(201).send('Aucun utilisateur')
    }
}


const authController = new AuthController()

module.exports = authController