const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config');
// const Pedido = require('./pedidoModel')
const ProcesoEnReferenciaEnPedido = require('./procesoReferenciaPedidoModel')

const ReferenciaPedidoModel = sequelize.define('ReferenciaEnPedido', {
  pedido: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  referencia: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[0-9]+/,
    },
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,    
  },
  valorUnitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  cantidadTotal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  valorTotalReferencia: {    
    type: DataTypes.DECIMAL(10, 2),
  },
},
);


// ReferenciaPedidoModel.belongsTo(Pedido, { foreignKey: 'pedido' });
ReferenciaPedidoModel.hasMany(ProcesoEnReferenciaEnPedido, { foreignKey: 'referencia' });


module.exports = ReferenciaPedidoModel;
