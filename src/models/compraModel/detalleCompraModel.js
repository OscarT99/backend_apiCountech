const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config');
const Insumo = require('../insumoModel/insumoModel')
const Compra = require('./compraModel')

const DetalleCompraModel = sequelize.define('DetalleCompra',{
    compra:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: true,
        },
    },
    insumo:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: true,
        },
    },
    cantidad:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        },
    },
    valorUnitario:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 1,
        },
    },
    impuestoIva:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        },
    },
    valorTotal:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 1,
        },
    }
})

DetalleCompraModel.belongsTo(Compra,{foreignKey:'compra'})
DetalleCompraModel.belongsTo(Insumo,{foreignKey:'insumo'})

module.exports = DetalleCompraModel;
