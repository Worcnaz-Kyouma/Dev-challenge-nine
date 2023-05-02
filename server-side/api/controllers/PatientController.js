const patientService = require('./../services/PatientService')

function createPatient(req, res){
    try {
        patientService.createPatient(req.body)
        res.sendStatus(201)
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500)
    }
}

async function getPatients(req, res){
    try {
        res.status(200)
        res.send(await patientService.getPatients(req.query))
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500)
    }
}

async function getPatient(req, res){
    try {
        res.status(200)
        res.send(await patientService.getPatient(req.params.pkIdPatient))
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500)
    }
}

function updatePatient(req, res){
    try {
        patientService.updatePatient(req.body)
        res.sendStatus(200)
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500)
    }
}

function deletePatient(req, res){
    try {
        patientService.deletePatient(req.params.pkIdPatient)
        res.sendStatus(200)
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500)
    }
}

module.exports = {
    createPatient,
    getPatient,
    getPatients,
    updatePatient,
    deletePatient
}