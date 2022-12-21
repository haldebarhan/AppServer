const { request, response } = require('express')
const { Mongoose, default: mongoose } = require('mongoose')
const getNotification  = require('../helpers/Notification')
const fileGuard = require('../images/fileGuard')
const Magistra = require('../models/Magistra')
const magistra = require('../models/Magistra')
const User = require('../models/user')


class UserController {
    getOne(req, res) {
        magistra.findOne({ matricule: req.params.matricule })
            .then((response) => {
                if (response) {
                    res.status(200).send(response)
                } else {
                    res.status(400).send({ text: "Aucun utilisateur " })
                }
            })
            .catch((err) => res.send(err))
    }

    removeOneUser(req, res) {
        const matricule = req.params.matricule
        magistra.findOneAndRemove({ matricule: matricule })
            .then(() => {
                User.findOneAndRemove({ owner: matricule })
                    .then(() => res.json({ text: "Opération effectuée avec success" }))
                    .catch(err => res.json(err))
            })
            .catch(err => res.json({ text: err }))
    }
    getPaginatedUser(req, res) {
        let { page } = req.query
        page = parseInt(page)
        const startIndex = (page - 1) * 20
        const endIndex = page * 20
        magistra.aggregate([{ $sort: { nom: 1 } }])
            .then((response) => {
                const result = response.slice(startIndex, endIndex)
                res.status(200).send(result)
            })
            .catch((err) => res.status(500).send(err.message))
    }
    getFilteredUsers(req, res) {
        let { name } = req.query
        magistra.find({ $or: [{ nom: new RegExp(name, 'i') }, { prenoms: new RegExp(name, 'i') }] })
            .then(response => res.status(200).send(response))
    }

    async upadteOneUserByAdmin(req, res) {
        const doc = await magistra.findOneAndUpdate(
            { _id: req.body._id },
            {
                $set:
                {
                    matricule: req.body.matricule,
                    grade: req.body.grade,
                    institution: req.body.institution,
                    daF: req.body.daF,
                    daG: req.body.daG,
                    fonction: req.body.fonction
                }
            },
            { new: true }
        )
        doc.notification.push(getNotification('Info'))
        await doc.save()
        res.status(200).send(doc)
    }
    async upadteOneUserBySelf(req, res) {
        const { nom, prenoms, contact, email, matricule, avatar } = req.body
        const file = req.file
        if (file) {
            fileGuard(avatar.toString())
        }
        const doc = await magistra.findOneAndUpdate(
            {
                matricule: matricule
            },
            {
                $set: {
                    avatar: file?.filename || avatar,
                    nom: nom,
                    prenoms: prenoms,
                    email: email,
                    contact: contact
                }
            },
            { new: true })
        res.status(200).send(doc)
    }
    async newUser(req, res) {
        const { matricule, nom, prenoms, contact, grade, email, fonction, daF, daG, institution, dateGrade } = req.body
        const magistra = new Magistra({
            _id: new mongoose.Types.ObjectId,
            matricule: matricule,
            nom: nom,
            prenoms: prenoms,
            contact: contact,
            email: email,
            fonction: fonction,
            grade: grade,
            dateGrade: dateGrade,
            daG: daG,
            daF: daF,
            institution: institution

        })
        magistra.save((err, mag) => {
            if (err) {
                res.status(500).send("erreur lors de l'enregistrement")
            }
            res.status(200).send(mag)
        })
    }

    async newAdmin(req, res){
        const {matricule, username, password} = req.body
        const user = new User({
            _id: new mongoose.Types.ObjectId,
            owner: matricule,
            username,
            password,
            role: 'ADMIN'
        })
        await user.save()
        res.status(200).send("Enregistrement effectué avec succes")
    }
}

const userController = new UserController()

module.exports = userController