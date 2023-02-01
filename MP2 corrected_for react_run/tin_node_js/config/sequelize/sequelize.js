const Sequelize = require('sequelize');

const sequelize = new Sequelize ({
    dialect: 'sqlite',
    storage: 'D:/sqllite/sqlite-tools-win32-x86-3400000/sqlite-tools-win32-x86-3400000/tin'
});

module.exports = sequelize;