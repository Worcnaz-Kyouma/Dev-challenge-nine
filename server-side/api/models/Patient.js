const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('./../../config/sequelize')

const Patient = sequelize.define('Patient', {
    pkIdPatient: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nmPatient: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dsEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    dtBorn: {
        type: DataTypes.DATE,
        allowNull: false
    },

    //

    nmCountry: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nmDistrict: {
        type: DataTypes.STRING
    },
    nmCity: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dsAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nrAddress: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    dsComplement: {
        type: DataTypes.STRING
    },
    cdCep: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cdUf: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'Patients'
})

module.exports = Patient