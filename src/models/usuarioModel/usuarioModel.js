const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../../database/config');


const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      is: /^[A-Za-z ]+/,
    },
  },
  cedula: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      is: /^[0-9]+/,
    },
    unique: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      is: /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+/,
    },
  },
  contrasena: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      len: [8, 20],
    },
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Usuario;
