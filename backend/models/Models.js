const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// --- Modelo Unificado de Usuario ---
const Usuario = sequelize.define(
  "Usuario",
  {
    idUsuario: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: DataTypes.ENUM("admin", "jefe", "empleado"),
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

// --- Modelo de Cliente ---
const Cliente = sequelize.define(
  "Cliente",
  {
    idCliente: {
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

// --- Modelos de Listas de Precios ---
const TipoPapel = sequelize.define(
  "TipoPapel",
  {
    idPapel: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  { tableName: "tipos_papel", timestamps: false }
);

const TipoTerminacion = sequelize.define(
  "TipoTerminacion",
  {
    idTerminacion: {
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
    idPersonalizacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  },
  { tableName: "tipos_personalizacion", timestamps: false }
);

// --- Modelos de Órdenes ---
const OrdenTrabajo = sequelize.define(
  "OrdenTrabajo",
  {
    idOT: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    fechaIn: { type: DataTypes.DATEONLY },
    fechaFin: { type: DataTypes.DATEONLY },
    archivo: { type: DataTypes.STRING(20) },
    prioridad: { type: DataTypes.ENUM("A", "M", "B") },
    envio: { type: DataTypes.ENUM("Retira", "Envia") },
    documento: { type: DataTypes.ENUM("Rem", "Fact") },
    observaciones: { type: DataTypes.TEXT },
    
    // --- CAMPO AGREGADO ---
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
    idDetalle: {
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

    // --- Claves Foráneas (FK) de Listas de Precios ---
    idPapel: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: TipoPapel,
        key: "idPapel",
      },
    },
    idTerminacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: TipoTerminacion,
        key: "idTerminacion",
      },
    },
    idPersonalizacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: TipoPersonalizacion,
        key: "idPersonalizacion",
      },
    },
  },
  {
    tableName: "detalles_orden",
    timestamps: false,
  }
);

const OrdenCotizacion = sequelize.define(
  "OrdenCotizacion",
  {
    idOc: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
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

// --- Modelo de Solicitudes de Material ---
const SolicitudMaterial = sequelize.define(
  "SolicitudMaterial",
  {
    idSolicitud: {
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

// --- Modelos de Chat ---
const Chat = sequelize.define(
  "Chat",
  {
    idChat: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  },
  {
    tableName: "chats",
    timestamps: true,
  }
);

const Mensaje = sequelize.define(
  "Mensaje",
  {
    idMen: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    contMen: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    tableName: "mensajes",
    timestamps: true,
  }
);

// =================================================================
// --- DEFINICIÓN DE RELACIONES ---
// =================================================================

// --- Relaciones de Órdenes, Clientes y Cotizaciones ---
Cliente.hasMany(OrdenTrabajo, { foreignKey: "idCliente" });
OrdenTrabajo.belongsTo(Cliente, { foreignKey: "idCliente" });

Cliente.hasMany(OrdenCotizacion, { foreignKey: "idCliente" });
OrdenCotizacion.belongsTo(Cliente, { foreignKey: "idCliente" });

OrdenTrabajo.hasMany(DetalleOrden, { foreignKey: "idOT" });
DetalleOrden.belongsTo(OrdenTrabajo, { foreignKey: "idOT" });

OrdenCotizacion.belongsToMany(OrdenTrabajo, {
  through: "cotizacion_ots",
  foreignKey: "idOc",
});
OrdenTrabajo.belongsToMany(OrdenCotizacion, {
  through: "cotizacion_ots",
  foreignKey: "idOT",
});

// --- Relaciones de Listas de Precios (con Detalles de Orden) ---
TipoPapel.hasMany(DetalleOrden, { foreignKey: "idPapel" });
DetalleOrden.belongsTo(TipoPapel, { foreignKey: "idPapel" });

TipoTerminacion.hasMany(DetalleOrden, { foreignKey: "idTerminacion" });
DetalleOrden.belongsTo(TipoTerminacion, { foreignKey: "idTerminacion" });

TipoPersonalizacion.hasMany(DetalleOrden, { foreignKey: "idPersonalizacion" });
DetalleOrden.belongsTo(TipoPersonalizacion, {
  foreignKey: "idPersonalizacion",
});

// --- Relaciones de Solicitud de Material ---
OrdenTrabajo.hasMany(SolicitudMaterial, { foreignKey: "idOT" });
SolicitudMaterial.belongsTo(OrdenTrabajo, { foreignKey: "idOT" });

Usuario.hasMany(SolicitudMaterial, { foreignKey: "idUsuario" });
SolicitudMaterial.belongsTo(Usuario, { foreignKey: "idUsuario" });

// --- Relaciones de Chat ---
Chat.hasMany(Mensaje, { foreignKey: "idChat" });
Mensaje.belongsTo(Chat, { foreignKey: "idChat" });

Usuario.hasMany(Mensaje, { foreignKey: "idUsuarioSender" });
Mensaje.belongsTo(Usuario, {
  as: "remitente",
  foreignKey: "idUsuarioSender",
});

Usuario.belongsToMany(Chat, {
  through: "usuario_chat",
  foreignKey: "idUsuario",
});
Chat.belongsToMany(Usuario, {
  through: "usuario_chat",
  foreignKey: "idChat",
});

// --- Exports ---
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