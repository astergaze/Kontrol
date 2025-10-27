const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Empresa
const Empresa = sequelize.define(
  "empresa",
  {
    idEmp: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    logo: { type: DataTypes.TEXT, allowNull: false },
  },
  { timestamps: false }
);

// Jefe
const Jefe = sequelize.define(
  "jefe",
  {
    idCoor: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(30), allowNull: false },
    apellido: { type: DataTypes.STRING(30), allowNull: false },
  },
  { timestamps: false }
);

// Empleado
const Empleado = sequelize.define(
  "empleado",
  {
    idEmp: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    salario: { type: DataTypes.BIGINT, allowNull: false },
    nombre: { type: DataTypes.STRING(30), allowNull: false },
    apellido: { type: DataTypes.STRING(30), allowNull: false },
    email:{type: DataTypes.STRING(50), allowNull: false, unique: true, validate: {isEmail: true}},
    telefono:{type: DataTypes.BIGINT(15), allowNull: false, unique:true, validate:{len: [9,15]}},
    DNI:{type: DataTypes.BIGINT(15), allowNull: false, unique: true},
    password: { type: DataTypes.STRING(130), allowNull: false},
  },
  { timestamps: true }
);

// Cliente
const Cliente = sequelize.define(
  "cliente",
  {
    idCliente: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    nomClien: { type: DataTypes.STRING(60), allowNull: false },
    contacto: { type: DataTypes.STRING(20), allowNull: false },
    direccion: { type: DataTypes.TEXT, allowNull: false },
  },
  { timestamps: false }
);

// Productos
const Producto = sequelize.define(
  "productos",
  {
    idProd: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    nomProduc: { type: DataTypes.STRING(30), allowNull: false },
    categoria: { type: DataTypes.STRING(30), allowNull: false },
  },
  { timestamps: false }
);

// OT
const OT = sequelize.define(
  "OT",
  {
    idOT: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    altura: { type: DataTypes.DECIMAL, allowNull: false },
    longitud: { type: DataTypes.DECIMAL, allowNull: false },
    fechaIn: { type: DataTypes.DATE },
    fechaFin: { type: DataTypes.DATE },
    colores: { type: DataTypes.STRING(10), allowNull: false },
    prioridad: { type: DataTypes.INTEGER, allowNull: false },
    original: { type: DataTypes.INTEGER },
    copia: { type: DataTypes.INTEGER },
    descripcion: { type: DataTypes.TEXT, allowNull: false },
    precio: { type: DataTypes.DECIMAL, allowNull: false },
    acabado: { type: DataTypes.STRING(20), allowNull: false },
  },
  { timestamps: false }
);

OT.belongsTo(Producto, { foreignKey: "idProd" });
Producto.hasMany(OT, { foreignKey: "idProd" });

// OrdenCot
const OrdenCot = sequelize.define(
  "ordenCot",
  {
    idOc: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  },
  { timestamps: false }
);

OrdenCot.belongsTo(Producto, { foreignKey: "idProdu" });
OrdenCot.belongsTo(OT, { foreignKey: "OT" });
OrdenCot.belongsTo(Cliente, { foreignKey: "idCliente" });

// Mensajes
const MenEmp = sequelize.define(
  "menEmp",
  {
    idMen: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    contMen: { type: DataTypes.TEXT, allowNull: false },
    fechaEnv: { type: DataTypes.DATE },
    fechaRec: { type: DataTypes.DATE },
  },
  { timestamps: false }
);

MenEmp.belongsTo(Empleado, { foreignKey: "idEmp" });

const MenCoor = sequelize.define(
  "menCoor",
  {
    idMen: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    contMen: { type: DataTypes.TEXT, allowNull: false },
    fechaEnv: { type: DataTypes.DATE },
    fechaRec: { type: DataTypes.DATE },
  },
  { timestamps: false }
);

MenCoor.belongsTo(Jefe, { foreignKey: "idCoor" });

// Chat
const Chat = sequelize.define(
  "chat",
  {
    idChat: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  },
  { timestamps: false }
);

Chat.belongsTo(MenCoor, { foreignKey: "idMenCoor" });
Chat.belongsTo(MenEmp, { foreignKey: "idMenEmp" });

// Relaciones adicionales
Empleado.belongsToMany(Producto, {
  through: "empProductT",
  foreignKey: "idEmpleado",
});
Producto.belongsToMany(Empleado, {
  through: "empProductT",
  foreignKey: "idProductoT",
});

Empleado.belongsToMany(Producto, {
  through: "empProductP",
  foreignKey: "idEmpleado",
});
Producto.belongsToMany(Empleado, {
  through: "empProductP",
  foreignKey: "idProductoP",
});

Empleado.belongsToMany(Chat, { through: "empChat", foreignKey: "idEmpleado" });
Chat.belongsToMany(Empleado, { through: "empChat", foreignKey: "idChat" });

Jefe.belongsToMany(Empleado, { through: "jefeEmp", foreignKey: "jefe" });
Empleado.belongsToMany(Jefe, { through: "jefeEmp", foreignKey: "empleado" });

Jefe.belongsToMany(Chat, { through: "jefeChat", foreignKey: "idJefe" });
Chat.belongsToMany(Jefe, { through: "jefeChat", foreignKey: "idChat" });

Jefe.belongsToMany(Empresa, { through: "empJefe", foreignKey: "jefe" });
Empresa.belongsToMany(Jefe, { through: "empJefe", foreignKey: "empre" });

OrdenCot.belongsToMany(OT, { through: "OcOt", foreignKey: "idOc" });
OT.belongsToMany(OrdenCot, { through: "OcOt", foreignKey: "idOt" });

Producto.belongsToMany(Cliente, {
  through: "produCliente",
  foreignKey: "producto",
});
Cliente.belongsToMany(Producto, {
  through: "produCliente",
  foreignKey: "cliente",
});
OT.belongsToMany(Cliente, { through: "produCliente", foreignKey: "OT" });

module.exports = {
  Empresa,
  Jefe,
  Empleado,
  Cliente,
  Producto,
  OT,
  OrdenCot,
  MenEmp,
  MenCoor,
  Chat,
};
