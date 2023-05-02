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
        allowNull: false
    },
    dsEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    dtBorn: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
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
        allowNull: false
    },
    nmDistrict: {
        type: DataTypes.STRING
    },
    nmCity: {
        type: DataTypes.STRING
    },
    dsAddress: {
        type: DataTypes.STRING,
        allowNull: false
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