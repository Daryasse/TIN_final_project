const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Author = sequelize.define('Author', {
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
            },
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
    nickname: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            len: {
                args: [0, 60],
                msg: "The field should contain 0 to 60 characters."
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

module.exports = Author;