const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config');
const ColorEnProcesoEnReferenciaEnPedido = require('./colorProcesoReferenciaPedidoModel')

const TallaColorProcesoReferenciaPedidoModel = sequelize.define('TallaEnColorEnProcesoEnReferenciaEnPedido', {
  color: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  talla: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: ['S', 'M', 'L', 'XL'],
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

TallaColorProcesoReferenciaPedidoModel.belongsTo(ColorEnProcesoEnReferenciaEnPedido, { foreignKey: 'color' });

module.exports = TallaColorProcesoReferenciaPedidoModel;
