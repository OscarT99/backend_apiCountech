const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config');
// const ColorEnProcesoEnReferenciaEnPedido = require('./colorProcesoReferenciaPedidoModel')

const TallaColorProcesoReferenciaPedidoModel = sequelize.define('TallaEnColorEnProcesoEnReferenciaEnPedido', {
  color: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  talla: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['S', 'M', 'L', 'XL']],
    },
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },

  cantAsignada: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },  

  cantHecha: {    
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },

  
});

// TallaColorProcesoReferenciaPedidoModel.belongsTo(ColorEnProcesoEnReferenciaEnPedido, { foreignKey: 'color' });

module.exports = TallaColorProcesoReferenciaPedidoModel;
