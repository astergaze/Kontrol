use Kingdom;
go
/*Creando las tablas principales*/
create table empresa(
idEmp int not null identity primary key,
logo text not null 
);
create table jefe(
idCoor int not null identity primary key,
nombre varchar(30) not null,
apellido varchar(30) not null
);
create table empleado(
idEmp bigint not null identity primary key,
salario bigint not null,
nombre varchar(30) not null,
apellido varchar(30) not null
);
create table cliente(
idCliente bigint not null identity primary key,
nomClien varchar(60) not null,
contacto varchar(20) not null,
direccion text not null
);
create table productos(
idProd bigint not null identity primary key,
nomProduc varchar(30) not null,
categoria varchar(30) not null,
);
create table OT(
idOT bigint not null identity primary key,
altura decimal not null,
longitud decimal not null,
fechaIn date,
fechaFin date,
colores varchar(10) not null,
prioridad int not null,
idProd bigint not null,
original int,
copia int,
descripcion text not null,
precio decimal not null,
acabado varchar(20) not null,
CONSTRAINT FK_idProd FOREIGN KEY (idProd) REFERENCES productos(idProd),
);
create table ordenCot (
idOc bigint NOT NULL identity primary key,
idProdu bigint NOT NULL, 
OT bigint NOT NULL, 
idCliente bigint NOT NULL,
CONSTRAINT FK_idProdu FOREIGN KEY (idProdu) REFERENCES productos(idProd),
CONSTRAINT FK_OT FOREIGN KEY (OT) REFERENCES OT(idOT),
CONSTRAINT FK_idCliente FOREIGN KEY (idCliente) REFERENCES cliente(idCliente)
);
create table menEmp(
idMen bigint not null identity primary key,
contMen text not null,
idEmp bigint not null,
fechaEnv date,
fechaRec date,
CONSTRAINT FK_idEmp FOREIGN KEY (idEmp) REFERENCES empleado(idEmp),
);
create table menCoor(
idMen bigint not null identity primary key,
contMen text not null,
idCoor int not null,
fechaEnv date,
fechaRec date,
CONSTRAINT FK_idCoor FOREIGN KEY (idCoor) REFERENCES jefe(idCoor),
);
create table chat(
idChat bigint not null identity primary key,
idMenCoor bigint not null,
idMenEmp bigint not null,
CONSTRAINT FK_menCoor FOREIGN KEY (idMenCoor) REFERENCES menCoor(idMen),
CONSTRAINT FK_menEmp FOREIGN KEY (idMenEmp) REFERENCES menEmp(idMen),
);

create table produCliente(
producto BIGINT not null,
cliente BIGINT not null,
OT BIGINT not null,

Constraint FK_producto FOREIGN KEY (producto) References productos(idProd),
Constraint FK_cliente FOREIGN KEY (cliente) REFERENCES cliente(idCliente),
Constraint FK_OTProd FOREIGN KEY (OT) REFERENCES OT(idOT)
);

create table empProductT(
idProductoT BIGINT not null,
idEmpleado BIGINT not null,

Constraint FK_idProductoT FOREIGN KEY (idProductoT) REFERENCES productos(idProd),
Constraint FK_idEmpleado FOREIGN KEY (idEmpleado) REFERENCES empleado(idEmp),
);

create table empProductP(
idProductoP BIGINT not null,
idEmpleado BIGINT not null,

Constraint FK_idProductoP FOREIGN KEY (idProductoP) REFERENCES productos(idProd),
Constraint FK_idEmpleadoP FOREIGN KEY (idEmpleado) REFERENCES empleado(idEmp),
);

create table empChat(
idEmpleado BIGINT not null,
idChat BIGINT not null,
Constraint FK_idEmpleadoChat FOREIGN KEY (idEmpleado) REFERENCES empleado(idEmp),
Constraint FK_idChat FOREIGN KEY (idChat) REFERENCES Chat(idChat)
);

create table jefeEmp(
jefe INT not null,
empleado BIGINT not null,

Constraint FK_jefe FOREIGN KEY (jefe) REFERENCES jefe(idCoor),
Constraint FK_empleado FOREIGN KEY (empleado) REFERENCES empleado(idEmp)
);

create table jefeChat(
idJefe INT not null,
idChat BIGINT not null,

Constraint FK_idJefe FOREIGN KEY (idJefe) REFERENCES jefe(idCoor),
Constraint FK_idChatJ FOREIGN KEY (idChat) REFERENCES chat(idChat)
);

create table empJefe(
jefe INT not null,
empre INT not null,

Constraint FK_jefeE FOREIGN KEY (jefe) REFERENCES jefe(idCoor),
Constraint FK_empre FOREIGN KEY (empre) REFERENCES empresa(idEmp)
);

create table OcOt(
idOc BIGINT not null,
idOt BIGINT not null,

Constraint FK_idOc FOREIGN KEY (idOc) REFERENCES ordenCot(idOc),
Constraint FK_idOt FOREIGN KEY (idOt) REFERENCES OT(idOT)
);
-- Insertar datos en la tabla empresa
INSERT INTO empresa (logo) VALUES ('logo_empresa_1.png');

-- Insertar datos en la tabla jefe
INSERT INTO jefe (nombre, apellido) VALUES ('Carlos', 'Gonzalez');

-- Insertar datos en la tabla empleado
INSERT INTO empleado (salario, nombre, apellido) VALUES (50000, 'Maria', 'Lopez');

-- Insertar datos en la tabla cliente
INSERT INTO cliente (nomClien, contacto, direccion) VALUES ('Empresa ABC', '123456789', 'Av. Principal 123');

-- Insertar datos en la tabla productos
INSERT INTO productos (nomProduc, categoria) VALUES ('Producto A', 'Categoria X');

-- Insertar datos en la tabla OT
INSERT INTO OT (altura, longitud, fechaIn, fechaFin, colores, prioridad, idProd, original, copia, descripcion, precio, acabado) 
VALUES (2.5, 1.8, '2025-06-01', '2025-06-10', 'Rojo', 1, 1, 1, 2, 'Descripci�n del producto', 150.00, 'Brillante');

-- Insertar datos en la tabla ordenCot
INSERT INTO ordenCot (idProdu, OT, idCliente) VALUES (1, 1, 1);

-- Insertar datos en la tabla menEmp
INSERT INTO menEmp (contMen, idEmp, fechaEnv, fechaRec) VALUES ('Mensaje importante', 1, '2025-06-02', '2025-06-03');

-- Insertar datos en la tabla menCoor
INSERT INTO menCoor (contMen, idCoor, fechaEnv, fechaRec) VALUES ('Mensaje del jefe', 1, '2025-06-02', '2025-06-03');

-- Insertar datos en la tabla chat
INSERT INTO chat (idMenCoor, idMenEmp) VALUES (1, 1);

-- Insertar datos en la tabla produCliente
INSERT INTO produCliente (producto, cliente, OT) VALUES (1, 1, 1);

-- Insertar datos en la tabla empProductT
INSERT INTO empProductT (idProductoT, idEmpleado) VALUES (1, 1);

-- Insertar datos en la tabla empProductP
INSERT INTO empProductP (idProductoP, idEmpleado) VALUES (1, 1);

-- Insertar datos en la tabla empChat
INSERT INTO empChat (idEmpleado, idChat) VALUES (1, 1);

-- Insertar datos en la tabla jefeEmp
INSERT INTO jefeEmp (jefe, empleado) VALUES (1, 1);

-- Insertar datos en la tabla jefeChat
INSERT INTO jefeChat (idJefe, idChat) VALUES (1, 1);

-- Insertar datos en la tabla empJefe
INSERT INTO empJefe (jefe, empre) VALUES (1, 1);

-- Insertar datos en la tabla OcOt
INSERT INTO OcOt (idOc, idOt) VALUES (1, 1);