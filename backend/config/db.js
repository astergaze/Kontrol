const Sequelize = require("sequelize");

const sequelize = new Sequelize('Kingdom', 'postgres', '123', {
    host: 'localhost',
    dialect: 'postgres'
})
module.exports = sequelize
/* Use the below code if using SQL Server, otherwise if using PSQL use the one from above  */
// const Sequelize = require('sequelize-msnodesqlv8');

// const sequelize = new Sequelize('Kingdom', null, null, {
//   dialect: 'mssql',
//   dialectModulePath: 'sequelize-msnodesqlv8',
//   dialectOptions: {
//     options: {
//       trustedConnection: true
//     }
//   },
//   host: 'localhost'
// });

// module.exports = sequelize;
