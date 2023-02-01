const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Order = sequelize.define('Order', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    date: {
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
    book_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "The field is required."
            }
        }
    },
    client_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "The field is required."
            }
        }
    }
});

module.exports = Order;