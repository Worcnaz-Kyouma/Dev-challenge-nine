const patientService = require('./../services/PatientService')

function getHttpErrorStatusCode(data){
    const { error: {type} } = data
    const clientErrors = ["Error", "ValidationError","UniqueConstraintError"]
    
    if(clientErrors.includes(type)){
        return 400
    }
    else{
        return 500
    }
    
}

async function createPatient(req, res){
    const data = await patientService.createPatient(req.body)

    res.status(201)
    if(data?.error)
        res.status(getHttpErrorStatusCode(data))
    
    res.json(data)
}

async function getPatients(req, res){
    const data = await patientService.getPatients(req.query)

    res.status(200)
    if(data?.error)
        res.status(getHttpErrorStatusCode(data))

    res.json(data)
}

async function getPatient(req, res){
    const data = await patientService.getPatient(req.params.pkIdPatient)

    res.status(200)
    if(data?.error)
        res.status(getHttpErrorStatusCode(data))     

    res.json(data)
}

async function updatePatient(req, res){
    const data = await patientService.updatePatient(req.body)

    res.status(200)
    if(data?.error)
        res.status(getHttpErrorStatusCode(data))   

    res.json(data)
}

async function deletePatient(req, res){
    const data = await patientService.deletePatient(req.params.pkIdPatient)

    res.status(200)
    if(data?.error){
        res.status(getHttpErrorStatusCode(data))
    }
    
    res.json(data)
}

module.exports = {
    createPatient,
    getPatient,
    getPatients,
    updatePatient,
    deletePatient
}