const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config');
const ReferenciaEnPedido = require('./referenciaPedidoModel')

const ProcesoReferenciaPedidoModel = sequelize.define('ProcesoEnReferenciaEnPedido', {
  referencia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  proceso: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipoDeMaquina: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Fileteadora', 'Plana', 'Presilladora', 'Recubridora','Manual']],
    },
  },
  cantidadTotal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
});

ProcesoReferenciaPedidoModel.belongsTo(ReferenciaEnPedido, { foreignKey: 'referencia' });

module.exports = ProcesoReferenciaPedidoModel;
