const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// --- Modelos Base ---

const Empresa = sequelize.define(
  "empresa",
  {
    idEmp: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    logo: { type: DataTypes.TEXT, allowNull: false },
  },
  { timestamps: false }
);

const Jefe = sequelize.define(
  "jefe",
  {
    idJefe: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(30), allowNull: false },
    apellido: { type: DataTypes.STRING(30), allowNull: false },
  },
  { timestamps: false }
);

const Empleado = sequelize.define(
  "empleado",
  {
    idEmpleado: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true }, 
    salario: { type: DataTypes.BIGINT, allowNull: false },
    nombre: { type: DataTypes.STRING(30), allowNull: false },
    apellido: { type: DataTypes.STRING(30), allowNull: false },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    telefono: {
      type: DataTypes.STRING(20), 
      allowNull: false,
      unique: true,
      validate: { len: [9, 20] }, 
    },
    DNI: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
  },
  { timestamps: true }
);

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

const Producto = sequelize.define(
  "productos",
  {
    idProd: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    nomProduc: { type: DataTypes.STRING(30), allowNull: false },
    categoria: { type: DataTypes.STRING(30), allowNull: false },
  },
  { timestamps: false }
);

const OT = sequelize.define(
  "OT",
  {
    idOT: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    altura: { type: DataTypes.DECIMAL, allowNull: false },
    longitud: { type: DataTypes.DECIMAL, allowNull: false },
    fechaIn: { type: DataTypes.DATEONLY }, // DATEONLY pero si no se necesita la hora, en otro caso, usar otro
    fechaFin: { type: DataTypes.DATEONLY },
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

const OrdenCot = sequelize.define(
  "ordenCot",
  {
    idOc: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  },
  { timestamps: false }
);

// --- Modelos de Chat (REFACTORIZADOS) ---

const Chat = sequelize.define(
  "chat",
  {
    idChat: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  },
  { timestamps: true }
);

const Mensaje = sequelize.define(
  "mensaje",
  {
    idMen: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    contMen: { type: DataTypes.TEXT, allowNull: false },
  },
  { timestamps: true }
);

// --- Definición de Relaciones ---

// 1:N -> Empresa tiene muchos Jefes, Jefe pertenece a 1 Empresa
Empresa.hasMany(Jefe, { foreignKey: "idEmp" });
Jefe.belongsTo(Empresa, { foreignKey: "idEmp" });

// 1:N -> Producto tiene muchas OTs, OT pertenece a 1 Producto
Producto.hasMany(OT, { foreignKey: "idProd" });
OT.belongsTo(Producto, { foreignKey: "idProd" });

// 1:N -> OrdenCot centraliza relaciones
OrdenCot.belongsTo(Producto, { foreignKey: "idProd" });
OrdenCot.belongsTo(OT, { foreignKey: "idOT" }); 
OrdenCot.belongsTo(Cliente, { foreignKey: "idCliente" });

// --- Relaciones del Chat ---

// 1:N -> Chat tiene muchos Mensajes
Chat.hasMany(Mensaje, { foreignKey: "idChat" });
Mensaje.belongsTo(Chat, { foreignKey: "idChat" });

// 1:N -> Empleado (remitente) ha enviado muchos Mensajes
Empleado.hasMany(Mensaje, { foreignKey: "idEmpleadoSender" });
Mensaje.belongsTo(Empleado, {
  as: "remitenteEmpleado",
  foreignKey: "idEmpleadoSender",
});

// 1:N -> Jefe (remitente) ha enviado muchos Mensajes
Jefe.hasMany(Mensaje, { foreignKey: "idJefeSender" });
Mensaje.belongsTo(Jefe, {
  as: "remitenteJefe",
  foreignKey: "idJefeSender",
});

// M:N -> Empleado está en muchos Chats
Empleado.belongsToMany(Chat, {
  through: "empChat",
  foreignKey: "idEmpleado",
});
Chat.belongsToMany(Empleado, { through: "empChat", foreignKey: "idChat" });

// M:N -> Jefe está en muchos Chats
Jefe.belongsToMany(Chat, { through: "jefeChat", foreignKey: "idJefe" });
Chat.belongsToMany(Jefe, { through: "jefeChat", foreignKey: "idChat" });

// --- Relaciones Adicionales (Muchos a Muchos) ---

// M:N -> Empleado <-> Producto (Relación 1)
Empleado.belongsToMany(Producto, {
  through: "empProductT", 
  foreignKey: "idEmpleado",
  as: "productosT", 
});
Producto.belongsToMany(Empleado, {
  through: "empProductT",
  foreignKey: "idProductoT",
  as: "empleadosT",
});

// M:N -> Empleado <-> Producto (Relación 2)
Empleado.belongsToMany(Producto, {
  through: "empProductP",
  foreignKey: "idEmpleado",
  as: "productosP", 
});
Producto.belongsToMany(Empleado, {
  through: "empProductP",
  foreignKey: "idProductoP",
  as: "empleadosP", 
});

// M:N -> Jefe <-> Empleado
Jefe.belongsToMany(Empleado, { through: "jefeEmp", foreignKey: "jefe" });
Empleado.belongsToMany(Jefe, { through: "jefeEmp", foreignKey: "empleado" });

// M:N -> OrdenCot <-> OT
OrdenCot.belongsToMany(OT, { through: "OcOt", foreignKey: "idOc" });
OT.belongsToMany(OrdenCot, { through: "OcOt", foreignKey: "idOt" });

// M:N -> Producto <-> Cliente
Producto.belongsToMany(Cliente, {
  through: "produCliente",
  foreignKey: "producto",
});
Cliente.belongsToMany(Producto, {
  through: "produCliente", 
  foreignKey: "cliente",
});

// M:N -> OT <-> Cliente
OT.belongsToMany(Cliente, {
  through: "otCliente", 
  foreignKey: "OT",
});
Cliente.belongsToMany(OT, {
  through: "otCliente", 
  foreignKey: "cliente",
});

// --- Exports ---

module.exports = {
  Empresa,
  Jefe,
  Empleado,
  Cliente,
  Producto,
  OT,
  OrdenCot,
  Chat,
  Mensaje, 
};