const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const formulario = sequelize.define(process.env.DB_TABLE_NAME,{
    nombre: {
        type: DataTypes.STRING
    },
    documento: {
        type: DataTypes.INTEGER
    },
    email: {
        type: DataTypes.STRING
    }
},
{   freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: false
})

formulario.sync();

module.exports = formulario;