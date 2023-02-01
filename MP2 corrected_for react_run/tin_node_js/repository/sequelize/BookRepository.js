const Author = require("../../model/sequelize/Author");
const Book = require("../../model/sequelize/Book");
const Order = require("../../model/sequelize/Order");
const Client = require('../../model/sequelize/Client');

exports.getBooks = () => {
    return Book.findAll({include:[
            {
                model: Author,
                as: 'author'
            },
            {
                model: Order,
                as: 'orders', include: [{
                    model: Client,
                    as: 'clients'
                }]
            }]
    });
};

exports.getBookById = (bookId) => {
    return Book.findByPk(bookId, {
        include: [{
            model: Author,
            as: 'author'
        },
            {
                model: Order,
                as: 'orders', include: [{
                    model: Client,
                    as: 'clients'
                }]
            }]
    });
};

exports.createBook = (newBookData) => {
    console.log(JSON.stringify(newBookData));
        return Book.create({
        title: newBookData.title,
        author_id: newBookData.author_id,
        price: newBookData.price,
        image_link: newBookData.image_link
    });
};

exports.updateBook = (bookId, bookData) => {
    return Book.update(bookData, {where: {_id: bookId}});
};

exports.deleteBook = (bookId) => {
    return Book.destroy({
        where: {_id: bookId}
    });
};