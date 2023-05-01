const express = require('express');

const patientController = require('./../controllers/PatientController')

const router = express.Router();

router.route('/')
    .post(patientController.createPatient)
    .put(patientController.updatePatient)
    .get(patientController.getPatients)

router.route('/:pkIdPatient')
    .delete(patientController.deletePatient)
    .get(patientController.getPatient)

router.get('/amount', patientController.getPatientAmount)

module.exports = router
