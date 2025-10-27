-- Creación de tablas
CREATE TABLE empresa (
  idEmp SERIAL PRIMARY KEY,
  logo TEXT NOT NULL
);

CREATE TABLE jefe (
  idCoor SERIAL PRIMARY KEY,
  nombre VARCHAR(30) NOT NULL,
  apellido VARCHAR(30) NOT NULL
);

CREATE TABLE empleado (
  idEmp BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  salario BIGINT NOT NULL,
  nombre VARCHAR(30) NOT NULL,
  apellido VARCHAR(30) NOT NULL,
  email VARCHAR(50) NOT NULL,
  telefono BIGINT NOT NULL,
  DNI BIGINT NOT NULL
);

CREATE TABLE cliente (
  idCliente BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nomClien VARCHAR(60) NOT NULL,
  contacto VARCHAR(20) NOT NULL,
  direccion TEXT NOT NULL
);

CREATE TABLE productos (
  idProd BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nomProduc VARCHAR(30) NOT NULL,
  categoria VARCHAR(30) NOT NULL
);

CREATE TABLE OT (
  idOT BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  altura DECIMAL NOT NULL,
  longitud DECIMAL NOT NULL,
  fechaIn DATE,
  fechaFin DATE,
  colores VARCHAR(10) NOT NULL,
  prioridad INT NOT NULL,
  idProd BIGINT NOT NULL,
  original INT,
  copia INT,
  descripcion TEXT NOT NULL,
  precio DECIMAL NOT NULL,
  acabado VARCHAR(20) NOT NULL,
  CONSTRAINT FK_idProd FOREIGN KEY (idProd) REFERENCES productos(idProd)
);

CREATE TABLE ordenCot (
  idOc BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  idProdu BIGINT NOT NULL,
  OT BIGINT NOT NULL,
  idCliente BIGINT NOT NULL,
  CONSTRAINT FK_idProdu FOREIGN KEY (idProdu) REFERENCES productos(idProd),
  CONSTRAINT FK_OT FOREIGN KEY (OT) REFERENCES OT(idOT),
  CONSTRAINT FK_idCliente FOREIGN KEY (idCliente) REFERENCES cliente(idCliente)
);

CREATE TABLE menEmp (
  idMen BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  contMen TEXT NOT NULL,
  idEmp BIGINT NOT NULL,
  fechaEnv DATE,
  fechaRec DATE,
  CONSTRAINT FK_idEmp FOREIGN KEY (idEmp) REFERENCES empleado(idEmp)
);

CREATE TABLE menCoor (
  idMen BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  contMen TEXT NOT NULL,
  idCoor INT NOT NULL,
  fechaEnv DATE,
  fechaRec DATE,
  CONSTRAINT FK_idCoor FOREIGN KEY (idCoor) REFERENCES jefe(idCoor)
);

CREATE TABLE chat (
  idChat BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  idMenCoor BIGINT NOT NULL,
  idMenEmp BIGINT NOT NULL,
  CONSTRAINT FK_menCoor FOREIGN KEY (idMenCoor) REFERENCES menCoor(idMen),
  CONSTRAINT FK_menEmp FOREIGN KEY (idMenEmp) REFERENCES menEmp(idMen)
);

CREATE TABLE produCliente (
  producto BIGINT NOT NULL,
  cliente BIGINT NOT NULL,
  OT BIGINT NOT NULL,
  CONSTRAINT FK_producto FOREIGN KEY (producto) REFERENCES productos(idProd),
  CONSTRAINT FK_cliente FOREIGN KEY (cliente) REFERENCES cliente(idCliente),
  CONSTRAINT FK_OTProd FOREIGN KEY (OT) REFERENCES OT(idOT)
);

CREATE TABLE empProductT (
  idProductoT BIGINT NOT NULL,
  idEmpleado BIGINT NOT NULL,
  CONSTRAINT FK_idProductoT FOREIGN KEY (idProductoT) REFERENCES productos(idProd),
  CONSTRAINT FK_idEmpleado FOREIGN KEY (idEmpleado) REFERENCES empleado(idEmp)
);

CREATE TABLE empProductP (
  idProductoP BIGINT NOT NULL,
  idEmpleado BIGINT NOT NULL,
  CONSTRAINT FK_idProductoP FOREIGN KEY (idProductoP) REFERENCES productos(idProd),
  CONSTRAINT FK_idEmpleadoP FOREIGN KEY (idEmpleado) REFERENCES empleado(idEmp)
);

CREATE TABLE empChat (
  idEmpleado BIGINT NOT NULL,
  idChat BIGINT NOT NULL,
  CONSTRAINT FK_idEmpleadoChat FOREIGN KEY (idEmpleado) REFERENCES empleado(idEmp),
  CONSTRAINT FK_idChat FOREIGN KEY (idChat) REFERENCES chat(idChat)
);

CREATE TABLE jefeEmp (
  jefe INT NOT NULL,
  empleado BIGINT NOT NULL,
  CONSTRAINT FK_jefe FOREIGN KEY (jefe) REFERENCES jefe(idCoor),
  CONSTRAINT FK_empleado FOREIGN KEY (empleado) REFERENCES empleado(idEmp)
);

CREATE TABLE jefeChat (
  idJefe INT NOT NULL,
  idChat BIGINT NOT NULL,
  CONSTRAINT FK_idJefe FOREIGN KEY (idJefe) REFERENCES jefe(idCoor),
  CONSTRAINT FK_idChatJ FOREIGN KEY (idChat) REFERENCES chat(idChat)
);

CREATE TABLE empJefe (
  jefe INT NOT NULL,
  empre INT NOT NULL,
  CONSTRAINT FK_jefeE FOREIGN KEY (jefe) REFERENCES jefe(idCoor),
  CONSTRAINT FK_empre FOREIGN KEY (empre) REFERENCES empresa(idEmp)
);

CREATE TABLE OcOt (
  idOc BIGINT NOT NULL,
  idOt BIGINT NOT NULL,
  CONSTRAINT FK_idOc FOREIGN KEY (idOc) REFERENCES ordenCot(idOc),
  CONSTRAINT FK_idOt FOREIGN KEY (idOt) REFERENCES OT(idOT)
);

-- Inserciones
INSERT INTO empresa (logo) VALUES ('logo_empresa_1.png');
INSERT INTO jefe (nombre, apellido) VALUES ('Carlos', 'Gonzalez');
INSERT INTO empleado (salario, nombre, apellido) VALUES (50000, 'Maria', 'Lopez');
INSERT INTO cliente (nomClien, contacto, direccion) VALUES ('Empresa ABC', '123456789', 'Av. Principal 123');
INSERT INTO productos (nomProduc, categoria) VALUES ('Producto A', 'Categoria X');
INSERT INTO OT (altura, longitud, fechaIn, fechaFin, colores, prioridad, idProd, original, copia, descripcion, precio, acabado) 
VALUES (2.5, 1.8, '2025-06-01', '2025-06-10', 'Rojo', 1, 1, 1, 2, 'Descripción del producto', 150.00, 'Brillante');
INSERT INTO ordenCot (idProdu, OT, idCliente) VALUES (1, 1, 1);
INSERT INTO menEmp (contMen, idEmp, fechaEnv, fechaRec) VALUES ('Mensaje importante', 1, '2025-06-02', '2025-06-03');
INSERT INTO menCoor (contMen, idCoor, fechaEnv, fechaRec) VALUES ('Mensaje del jefe', 1, '2025-06-02', '2025-06-03');
INSERT INTO chat (idMenCoor, idMenEmp) VALUES (1, 1);
INSERT INTO produCliente (producto, cliente, OT) VALUES (1, 1, 1);
INSERT INTO empProductT (idProductoT, idEmpleado) VALUES (1, 1);
INSERT INTO empProductP (idProductoP, idEmpleado) VALUES (1, 1);
INSERT INTO empChat (idEmpleado, idChat) VALUES (1, 1);
INSERT INTO jefeEmp (jefe, empleado) VALUES (1, 1);
INSERT INTO jefeChat (idJefe, idChat) VALUES (1, 1);
INSERT INTO empJefe (jefe, empre) VALUES (1, 1);
INSERT INTO OcOt (idOc, idOt) VALUES (1, 1);
