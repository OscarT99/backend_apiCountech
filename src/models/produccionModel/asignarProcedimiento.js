const { DataTypes } = require("sequelize");
const { sequelize } = require("../../database/config");

const Empleado = require("../empleadoModel/empleadoModel");
const Pedido = require("../pedidoModel/tallaColorProcesoReferenciaPedidoModel");

const AsignarProcedimiento = sequelize.define("AsignarProcedimiento", {

  idAsignarProcedimiento: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  fechaRegistro: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },

  cantAsignada: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },

  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

  fkEmpleado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  fkPedido: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

AsignarProcedimiento.belongsTo(Empleado, {
  foreignKey: "fkEmpleado",
});

AsignarProcedimiento.belongsTo(Pedido, {
  foreignKey: "fkProduccion",
});

module.exports = AsignarProcedimiento;
