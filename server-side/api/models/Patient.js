const { DataTypes } = require('sequelize')
const sequelize = require('./../../config/sequelize')

const Patient = sequelize.define('Patient', {
    pkIdPatient: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    nmPatient: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    dsEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    dtBorn: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
            isBefore: (() => {
                let date = new Date();
                date.setDate(date.getDate() + 1)
                
                return date.toJSON().slice(0,10)
            })()
        }
    },

    //

    nmCountry: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    nmCity: {
        type: DataTypes.STRING
    },
    nmDistrict: {
        type: DataTypes.STRING
    },
    dsAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    nrAddress: {
        type: DataTypes.DECIMAL
    },
    dsComplement: {
        type: DataTypes.STRING
    },
    cdCep: {
        type: DataTypes.STRING
    },
    cdUf: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'Patients'
})

module.exports = Patient