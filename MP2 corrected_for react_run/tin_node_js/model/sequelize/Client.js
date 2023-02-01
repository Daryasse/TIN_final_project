const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Client = sequelize.define('Client', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "The field is required."
            },
            len: {
                args: [2, 30],
                msg: "The field should contain 2 to 30 characters."
            }
        }
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "The field is required."
            },
            len: {
                args: [2, 30],
                msg: "The field should contain 2 to 30 characters."
            }
        }
    },
    birthdate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "The field is required."
            },
            isDate:{
                msg: "The field should contain date yyyy-MM-dd."
            },
            isBefore:"2023-01-25",
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "The field is required."
            },
            isEmail: {
                msg:"Email is not valid name@dom.com."
            },
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "The field is required."
            }
        }
    }
});

module.exports = Client;