const Author = require("../../model/sequelize/Author");
const Book = require("../../model/sequelize/Book");
const Client = require("../../model/sequelize/Client");
const Order = require("../../model/sequelize/Order");
const authUtils = require("../../util/authUtils");

exports.getClients = () => {
    return Client.findAll({include:[
            {
                model: Order,
                as: 'orders', include: [{
                    model: Book,
                    as: 'book',  include: [{
                        model: Author,
                        as: 'author'
                    }]
                }]
            }]
    });
};

exports.getClientById = (clientId) => {
    return Client.findByPk(clientId, {
        include: [
            {
                model: Order,
                as: 'orders', include: [{
                    model: Book,
                    as: 'book', include: [{
                        model: Author,
                        as: 'author'
                    }]
                }]
            }]
    });
};

exports.createClient = (newClientData) => {
    return Client.create({
        name: newClientData.name,
        surname: newClientData.surname,
        email: newClientData.email,
        birthdate: newClientData.birthdate,
        password: authUtils.hashPassword(newClientData.password)
    });
};

exports.updateClient = (clientId, clientData) => {
    const name = clientData.name;
    const surname = clientData.surname;
    const email = clientData.email;
    const birthdate = clientData.birthdate;
    return Client.update(clientData, {where: {_id: clientId}});
};

exports.deleteClient = (clientId) => {
    return Client.destroy({
        where: {_id: clientId}
    });
};

exports.findByEmail = (email) => {
    return Client.findOne({
        where: {email: email}
    });
};