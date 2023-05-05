const Patient = require('./../models/Patient')

function generateErrorJSON(err){
    const errorJSON = {
        error: {
            type: err.constructor.name,
            field: err.errors?.map(error => error.path),
            message: err.parent?.sqlMessage || err.errors?.map(error => error.message) /*|| err?.message*/
        }
    }

    return errorJSON
}

function createPatient(patientJSON){
    const newPatient = Patient.build(patientJSON)
    return newPatient.save().catch(generateErrorJSON)
}

async function getPatients(queryParams){
    if(!Object.keys(queryParams).length)
        return Patient.findAll().catch(generateErrorJSON)

    const { limit, page, nmPatient } = queryParams
    
    try {
        const patientAmount = await Patient.count({
            where: nmPatient ? {nmPatient: nmPatient} : null
        })
        
        const totalPages = Math.ceil(patientAmount/limit) 

        /*if(page!=1 && totalPages<page)
            throw new Error("Invalid page")*/

        
        const rows = await Patient.findAll({
            limit: parseInt(limit),
            offset: (page-1) * limit,
            where: nmPatient ? {nmPatient: nmPatient} : null
        })

        const responseBody = {
            patients: rows,
            totalPages: totalPages,
            currentPage: page
        }

        return responseBody

    } 
    catch (err) {
        return generateErrorJSON(err)
    }
}

function getPatient(pkIdPatient){
    return Patient.findByPk(pkIdPatient).catch(generateErrorJSON)
}

function updatePatient(patientJSON){
    return Patient.update(patientJSON, {
        where: {
            pkIdPatient: patientJSON.pkIdPatient
        }
    }).catch(generateErrorJSON)
}

function deletePatient(pkIdPatient){
    return Patient.destroy({
        where: {
            pkIdPatient: pkIdPatient
        }
    }).catch(generateErrorJSON)
}

module.exports = {
    createPatient,
    getPatient,
    getPatients,
    updatePatient,
    deletePatient,
}