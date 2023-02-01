const repository = require('../repository/sequelize/ClientRepository');

exports.getClients = (req, res, next) => {
    repository.getClients()
        .then(clients => {
            res.status(200).json(clients);
        }).catch(err => {
        console.log(err);
    });
};

exports.getClientById = (req, res, next) => {
    const id = req.params.id;
    repository.getClientById(id)
        .then(clients => {
            if (!clients) {
                res.status(404).json({
                    message: `Client with id: '+id+' is not found!`
                });
            } else {
                res.status(200).json(clients);
            }
        });
};

exports.createClient = (req, res, next) => {
    repository.createClient(req.body)
        .then(clients => {
            res.status(201).json(clients);
        }).catch(err => sendError(err, next));
};

exports.updateClient = (req, res, next) => {
    const id = req.params.id;
    repository.updateClient(id, req.body)
        .then(result => {
            res.status(200).json({
                message: 'Client is updated!',
                client: result
            });
        }).catch(err => sendError(err, next));
};

exports.deleteClient = (req, res, next) => {
    const id = req.params.id;
    repository.deleteClient(id)
        .then(result => {
            res.status(200).json({
                message: 'Removed client!',
                client: result
            });
        }).catch(err => sendError(err, next));
};

async function sendError(err, next) {
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    next(err);
}