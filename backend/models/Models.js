const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: DataTypes.ENUM("jefe", "empleado"),
      allowNull: false,
      defaultValue: "empleado",
    },
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
    },
    DNI: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "usuarios",
    timestamps: true,
  }
);

const Cliente = sequelize.define(
  "Cliente",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    nomClien: { type: DataTypes.STRING(60), allowNull: false },
    responsable: { type: DataTypes.STRING(60), allowNull: true },
    contacto: { type: DataTypes.STRING(50), allowNull: false },
    direccion: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    tableName: "clientes",
    timestamps: false,
  }
);

const TipoPapel = sequelize.define(
  "TipoPapel",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  { tableName: "tipos_papel", timestamps: false }
);

const TipoTerminacion = sequelize.define(
  "TipoTerminacion",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  { tableName: "tipos_terminacion", timestamps: false }
);

const TipoPersonalizacion = sequelize.define(
  "TipoPersonalizacion",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  },
  { tableName: "tipos_personalizacion", timestamps: false }
);

const OrdenTrabajo = sequelize.define(
  "OrdenTrabajo",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    fechaIn: { type: DataTypes.DATEONLY },
    fechaFin: { type: DataTypes.DATEONLY },
    archivo: { type: DataTypes.STRING(20) },
    prioridad: { type: DataTypes.ENUM("A", "M", "B") },
    envio: { type: DataTypes.ENUM("Retira", "Envia") },
    documento: { type: DataTypes.ENUM("Rem", "Fact") },
    observaciones: { type: DataTypes.TEXT },

    estado: {
      type: DataTypes.STRING(30), // Opcionalmente: DataTypes.ENUM("Pendiente", "En Proceso", "Completada")
      allowNull: false,
      defaultValue: "Pendiente",
    },
  },
  {
    tableName: "ordenes_trabajo",
    timestamps: true,
  }
);

const DetalleOrden = sequelize.define(
  "DetalleOrden",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    item: { type: DataTypes.INTEGER },
    descripcion: { type: DataTypes.TEXT },
    originales: { type: DataTypes.INTEGER },
    copias: { type: DataTypes.INTEGER },
    formato: { type: DataTypes.STRING(30) },
    colores: { type: DataTypes.STRING(30) },
  },
  {
    tableName: "detalles_orden",
    timestamps: false,
  }
);

const OrdenCotizacion = sequelize.define(
  "OrdenCotizacion",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    precioImpresion: { type: DataTypes.DECIMAL(10, 2) },
    precioPersonalizacion: { type: DataTypes.DECIMAL(10, 2) },
    precioTerminacion: { type: DataTypes.DECIMAL(10, 2) },
    impuestos: { type: DataTypes.DECIMAL(10, 2) },
    total: { type: DataTypes.DECIMAL(10, 2) },
  },
  {
    tableName: "ordenes_cotizacion",
    timestamps: true,
  }
);

const SolicitudMaterial = sequelize.define(
  "SolicitudMaterial",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    material: { type: DataTypes.STRING(255), allowNull: false },
    estado: {
      type: DataTypes.ENUM("Pendiente", "Aprobada", "Rechazada"),
      defaultValue: "Pendiente",
    },
  },
  {
    tableName: "solicitudes_material",
    timestamps: true,
  }
);

const Chat = sequelize.define(
  "Chat",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  },
  {
    tableName: "chats",
    timestamps: true,
  }
);

const Mensaje = sequelize.define(
  "Mensaje",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    contMen: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    tableName: "mensajes",
    timestamps: true,
  }
);

// Un Cliente tiene muchas Ordenes de Trabajo
Cliente.hasMany(OrdenTrabajo, { foreignKey: "clienteId" });
OrdenTrabajo.belongsTo(Cliente, { foreignKey: "clienteId" });

// Un Cliente tiene muchas Ordenes de Cotización
Cliente.hasMany(OrdenCotizacion, { foreignKey: "clienteId" });
OrdenCotizacion.belongsTo(Cliente, { foreignKey: "clienteId" });

// Una Orden de Trabajo tiene muchos Detalles
OrdenTrabajo.hasMany(DetalleOrden, { foreignKey: "ordenTrabajoId" });
DetalleOrden.belongsTo(OrdenTrabajo, { foreignKey: "ordenTrabajoId" });

// Relación N:M entre Cotización y Orden de Trabajo
OrdenCotizacion.belongsToMany(OrdenTrabajo, {
  through: "cotizacion_ots",
  foreignKey: "ordenCotizacionId", 
});
OrdenTrabajo.belongsToMany(OrdenCotizacion, {
  through: "cotizacion_ots",
  foreignKey: "ordenTrabajoId",
});

// --- Relaciones de Listas de Precios (con Detalles de Orden) ---
TipoPapel.hasMany(DetalleOrden, { foreignKey: "tipoPapelId" });
DetalleOrden.belongsTo(TipoPapel, { foreignKey: "tipoPapelId" });

TipoTerminacion.hasMany(DetalleOrden, { foreignKey: "tipoTerminacionId" });
DetalleOrden.belongsTo(TipoTerminacion, { foreignKey: "tipoTerminacionId" });

TipoPersonalizacion.hasMany(DetalleOrden, { foreignKey: "tipoPersonalizacionId" });
DetalleOrden.belongsTo(TipoPersonalizacion, {
  foreignKey: "tipoPersonalizacionId",
});

// Una Orden de Trabajo puede tener varias solicitudes
OrdenTrabajo.hasMany(SolicitudMaterial, { foreignKey: "ordenTrabajoId" });
SolicitudMaterial.belongsTo(OrdenTrabajo, { foreignKey: "ordenTrabajoId" });

// Un Usuario (empleado) crea la solicitud
Usuario.hasMany(SolicitudMaterial, { foreignKey: "usuarioId" });
SolicitudMaterial.belongsTo(Usuario, { foreignKey: "usuarioId" });

// Un Chat tiene muchos Mensajes
Chat.hasMany(Mensaje, { foreignKey: "chatId" });
Mensaje.belongsTo(Chat, { foreignKey: "chatId" });

// Un Usuario (remitente) envía muchos mensajes
Usuario.hasMany(Mensaje, { foreignKey: "remitenteId" });
Mensaje.belongsTo(Usuario, {
  as: "remitente",
  foreignKey: "remitenteId", // Debe coincidir
});

// Relación N:M entre Usuarios y Chats
Usuario.belongsToMany(Chat, {
  through: "usuario_chat",
  foreignKey: "usuarioId",
});
Chat.belongsToMany(Usuario, {
  through: "usuario_chat",
  foreignKey: "chatId",
});

module.exports = {
  Usuario,
  Cliente,
  TipoPapel,
  TipoTerminacion,
  TipoPersonalizacion,
  OrdenTrabajo,
  DetalleOrden,
  OrdenCotizacion,
  SolicitudMaterial,
  Chat,
  Mensaje,
};