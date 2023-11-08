const { DataTypes }  = require("sequelize");
const { sequelize } = require("../../database/config");

const EmpleadoModel = sequelize.define("Empleado", {
  idEmpleado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  tipoIdentificacion: {
    type: DataTypes.STRING,
    allowNull: false,
    // validate: {
    //   isIn: [["Cedula de ciudadania", "Cedula de extranjeria"]],
    // },
  },

  numeroIdentificacion: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    // validate: {
    //   is: /^\d+$/,
    // },
  },

  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    // validate: {
    //   is: /^[A-Za-z ]+/,
    // },
  },

  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
    // validate: {
    //   is: /^[A-Za-z ]+/,
    // },
  },

  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    // validate: {
    //   is: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/,
    // },
  },

  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
    // validate: {
    //   is: /^\(\+57\)\d{3}-\d{3}-\d{2}-\d{2}$/,
    // },
  },

  ciudad: {
    type: DataTypes.STRING,
    allowNull: false,
    // validate: {
    //   is: /^[A-Za-z]+/,
    // },
  },

  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  fechaIngreso: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = EmpleadoModel;