const Sequelize = require('sequelize')

const Author = require("../../model/sequelize/Author");
const Book = require("../../model/sequelize/Book");
const Order = require("../../model/sequelize/Order");
const Client = require("../../model/sequelize/Client");

exports.getOrders = () => {
    return Order.findAll({include:[
            {
                model: Book,
                as: 'book', include: [{
                    model: Author,
                    as: 'author'
                }]
            },
            {
                model: Client,
                as: 'clients'
            }]
    });
};

exports.getOrderById = (orderId) => {
    return Order.findByPk(orderId, {include:[
            {
                model: Book,
                as: 'book', include: [{
                    model: Author,
                    as: 'author'
                }]
            },
            {
                model: Client,
                as: 'clients'
            }]
    });
};

exports.createOrder = (newOrderData) => {
    console.log(JSON.stringify(newOrderData));
    return Order.create({
        date: newOrderData.date,
        book_id: newOrderData.book_id,
        client_id: newOrderData.client_id
    });
};

exports.updateOrder = (orderId, orderData) => {
    return Order.update(orderData, {where: {_id: orderId}});
};

exports.deleteOrder = (orderId) => {
    return Order.destroy({
        where: {_id: orderId}
    });
};

exports.deleteManyOrders = (orderIds) => {
    return Order.find({_id: {[Sequelize.Op.in]: orderIds}});
}