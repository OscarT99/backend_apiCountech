const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/config');
const Cliente = require('../clienteModel/clienteModel');

const PedidoModel = sequelize.define('Pedido', {
  cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: true,
    },
  },
  contacto: {
    type: DataTypes.STRING,
    validate: {
      is: /^[A-Za-záéíóúüÜÁÉÍÓÑñ. ]+$/,
    },
  },
  ordenTrabajo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^\d{1,10}$/,
    },
  },
  fechaOrdenTrabajo: {
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
  fechaEntregaOrden: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: true,
      isDate: true,
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
  valorTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notNull: true,
      isDecimal: true,
      min: 1,
    },
  },
  observaciones: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'Registrado',
    validate: {
      isIn: [['Registrado', 'En proceso', 'Terminado']],
    },
  },
});

PedidoModel.belongsTo(Cliente, { foreignKey: 'cliente' });

module.exports = PedidoModel;
