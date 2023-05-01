const express = require('express')
const rootRoutes = express.Router()

const patientRoutes = require('./PatientRoutes')

rootRoutes.use('/patients', patientRoutes)

module.exports = rootRoutes