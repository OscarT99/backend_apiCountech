const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../../database/config');
const Pedido = require('../pedidoModel/pedidoModel');

const AbonoVenta = sequelize.define('AbonoVenta', {
    venta: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fechaAbono: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    valorAbono: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
    
  });
  
  // foreign key
  AbonoVenta.belongsTo(Pedido, { foreignKey: 'venta', as: 'Pedido' });
  

module.exports = AbonoVenta;  