const sequelize = require('./sequelize');

const Author = require('../../model/sequelize/Author');
const Book = require('../../model/sequelize/Book');
const Client = require ('../../model/sequelize/Client');
const Order = require('../../model/sequelize/Order');
const authUtil = require('../../util/authUtils');
const passHash1 = authUtil.hashPassword('Anna1210');
const passHash2 = authUtil.hashPassword('Paarker2004');
const passHash3 = authUtil.hashPassword('Lilloo35');

module.exports = () => {
    Author.hasMany(Book, {as: 'book', foreignKey: {name: 'author_id', allowNull: false},
        constraints: true, onDelete: 'CASCADE'});
    Book.belongsTo(Author, {as: 'author', foreignKey:{name: 'author_id', allowNull: false}});
    Book.hasMany(Order, {as: 'orders', foreignKey: {name: 'book_id', allowNull: false},
        constraints: true, onDelete: 'CASCADE'});
    Client.hasMany(Order, {as: 'orders', foreignKey: {name: 'client_id', allowNull: false},
        constraints: true, onDelete: 'CASCADE'});
    Order.belongsTo(Book, {as: 'book', foreignKey: {name: 'book_id', allowNull: false}});
    Order.belongsTo(Client, {as: 'clients', foreignKey: {name: 'client_id', allowNull: false}});

    let allClients, allAuthors, allBooks;
    return sequelize
        .sync({force: true})
        .then( () => {
            return Author.findAll();
        })
        .then(authors => {
            if(!authors || authors.length == 0) {
                return Author.bulkCreate([
                    {name: 'Jane', nickname: 'Nancy', surname: 'Austen', image_link: "https://www.royalmint.com/globalassets/the-royal-mint/images/pages/discover/uk-coins/jane-austen/310_jane-austen_image1.jpg?width=2147483647"},
                    {name: 'Antoine', surname: 'de Saint-Exupéry', image_link: "https://images.gr-assets.com/authors/1330853515p5/1020792.jpg"},
                    {name: 'Fyodor', nickname: 'Monk Photius', surname: 'Dostoevsky', image_link: "https://library.vladimir.ru/wp-content/uploads/2021/09/%D0%B4%D0%BE%D1%81%D1%82%D0%BE%D0%B5%D0%B2%D1%81%D0%BA%D0%B8%D0%B9-238x300.jpg"}
                ])
                    .then(() => {
                        return Author.findAll();
                    });
            } else {
                return authors;
            }
        })
        .then(authors => {
            allAuthors = authors;
            return Book.findAll();
        })
        .then(books => {
            if(!books || books.length == 0){
                return Book.bulkCreate([
                    {title: 'Crime and Punishment', author_id: allAuthors[2]._id, price: 6, image_link: "http://prodimage.images-bn.com/pimages/9781631495311_p0_v6_s1200x630.jpg"},
                    {title: 'The Little Prince', author_id: allAuthors[1]._id, price: 3, image_link: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/4d4da979193995.5cbbf368022ef.jpg"},
                    {title: 'Pride and Prejudice', author_id: allAuthors[0]._id, price: 6, image_link: "https://pictures.abebooks.com/isbn/9780989010443-es.jpg"}
                ])
                    .then( () => {
                        return Book.findAll();
                    });
            } else {
                return books;
            }
        })
        .then( books => {
            allBooks = books;
            return Client.findAll();
        })
        .then(clients => {
            if(!clients || clients.length == 0){
                return Client.bulkCreate([
                    {name: 'Anna', surname: 'Sanlie', birthdate: '12-10-2001', email: 'annsanlie@gmail.com', password: passHash1 },
                    {name: 'John', surname: 'Parker', birthdate: '02-28-2004', email: 'jparker@gmail.com', password: passHash2},
                    {name: 'Lilo', surname: 'Adams', birthdate: '03-05-2007', email: 'liloadams@gmail.com', password: passHash3}
                ])
                    .then( () => {
                        return Client.findAll();
                    });
            } else {
                return clients;
            }
        })
        .then(clients => {
            allClients = clients;
            return Order.findAll();
        })
        .then (orders => {
            if(!orders || orders.length == 0){
                return Order.bulkCreate([
                    {date: '2022-07-12', client_id: allClients[2]._id, book_id: allBooks[1]._id},
                    {date: '2022-03-29', client_id: allClients[1]._id, book_id: allBooks[0]._id},
                    {date: '2021-12-13', client_id: allClients[0]._id, book_id: allBooks[0]._id}
                ]);
            }else {
                return orders;
            }
        });
};