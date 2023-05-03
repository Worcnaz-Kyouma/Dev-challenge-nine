const Patient = require('./../models/Patient')

function createPatient(patientJSON){
    const newPatient = Patient.build(patientJSON)
    newPatient.save().catch(err => console.log(err.name, err.errors[0].message))
}

async function getPatients(queryParams){
    if(queryParams=={})
        return Patient.findAll()
    else{
        const { limit, page/*, nmPatient*/ } = queryParams
        /*if(limit<0 || page<1)
            throw new Error('Limit or Page invalid')*/
        const rows = await Patient.findAll({
            limit: limit,
            offset: page-1 * limit,
            where: "nmPatient" in queryParams ? {nmPatient: queryParams.nmPatient} : null
        })

        const patientAmount = await Patient.count({
            where: "nmPatient" in queryParams ? {nmPatient: queryParams.nmPatient} : null
        })
        const totalPages = Math.ceil(patientAmount/limit) 

        const responseBody = {
            patients: rows,
            totalPages: totalPages,
            currentPage: page
        }

        return responseBody
    }
}

function getPatient(pkIdPatient){
    return Patient.findByPk(pkIdPatient)
}

function updatePatient(patientJSON){
    Patient.update(patientJSON, {
        where: {
            pkIdPatient: patientJSON.pkIdPatient
        }
    })
}

function deletePatient(pkIdPatient){
    Patient.destroy({
        where: {
            pkIdPatient: pkIdPatient
        }
    })
}

module.exports = {
    createPatient,
    getPatient,
    getPatients,
    updatePatient,
    deletePatient,
}