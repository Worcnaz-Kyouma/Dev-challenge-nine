const { Op } = require('sequelize')
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
            where: nmPatient 
                ? {nmPatient:{
                    [Op.like]: '%'+nmPatient+'%'
                }} 
                : null
        })
        
        const totalPages = Math.ceil(patientAmount/limit)

        const rows = await Patient.findAll({
            limit: parseInt(limit),
            offset: (page-1) * limit,
            where: nmPatient 
                ? {nmPatient:{
                    [Op.like]: '%'+nmPatient+'%'
                }} 
                : null
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

function updatePatient(pkIdPatient, patientJSON){
    return Patient.update(patientJSON, {
        where: {
            pkIdPatient: pkIdPatient
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