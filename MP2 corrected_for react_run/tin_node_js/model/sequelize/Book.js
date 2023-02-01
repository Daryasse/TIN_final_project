const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Book = sequelize.define('Book', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "The field is required."
            },
            len: {
                args: [2, 30],
                msg: "The field should contain 2 to 30 characters."
            },
        }
    },
    author_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "The field is required."
            },
        }
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "The field is required."
            },
            isInt: {
                min: 1,
                max: 200,
                msg: "The price should be between 1$ and 200$."
            }
        }
    },
    image_link: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: {
                msg: "The field is required."
            },
            isUrl: {
                msg: "The field should be a link."
            }
        }
    },
});

module.exports = Book;