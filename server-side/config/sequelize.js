const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('med_cloud', 'root', 'pradopgworcnaz0', {
    host: 'localhost',
    port: 3307,
    dialect: 'mysql'
})

module.exports = sequelize