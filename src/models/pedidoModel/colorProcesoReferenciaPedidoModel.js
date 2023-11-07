const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config');
const ProcesoEnReferenciaEnPedido = require('./procesoReferenciaPedidoModel')

const ColorProcesoReferenciaPedidoModel = sequelize.define('ColorEnProcesoEnReferenciaEnPedido', {
  proceso: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        is: /^[a-zA-ZáéíóúÁÉÍÓÚÑñ ]+$/,
    },
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
});

ColorProcesoReferenciaPedidoModel.belongsTo(ProcesoEnReferenciaEnPedido, { foreignKey: 'proceso' });

module.exports = ColorProcesoReferenciaPedidoModel;
