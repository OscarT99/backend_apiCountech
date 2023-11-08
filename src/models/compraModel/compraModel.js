const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config');
const Proveedor = require('../proveedorModel/proveedorModel')

const CompraModel = sequelize.define('Compra',{
    proveedor:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: true,
        }
    },
    fechaCompra:{
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: true,
            isDate: true,
        },
    },
    fechaRegistro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        validate: {
          isDate: true,
        },
    },
    numeroFactura: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },    
    totalBruto:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 1,
        },
    },
    iva:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 1,
        },
    },
    totalNeto:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 1,
        },
    },
    formaPago: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          isIn: [['Contado', 'Crédito']],
        },
    },
})

CompraModel.belongsTo(Proveedor,{foreignKey:'proveedor'})

module.exports = CompraModel;