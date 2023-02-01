const repository = require('../repository/sequelize/OrderRepository');

exports.getOrders = (req, res, next) => {
    repository.getOrders()
        .then(orders => {
            res.status(200).json(orders);
        }).catch(err => {
        console.log(err);
    });
};

exports.getOrderById = (req, res, next) => {
    const id = req.params.id;
    repository.getOrderById(id)
        .then(orders => {
            if (!orders) {
                res.status(404).json({
                    message: `Order with id: '+id+' is not found!`
                });
            } else {
                res.status(200).json(orders);
            }
        });
};

exports.createOrder = (req, res, next) => {
    repository.createOrder(req.body)
        .then(orders => {
            res.status(201).json(orders)
        }).catch(err => sendError(err, next));
};

exports.updateOrder = (req, res, next) => {
    const id = req.params.id;
    repository.updateOrder(id, req.body)
        .then(result => {
            res.status(200).json({
                message: 'Order is updated!',
                order: result
            })
        }).catch(err => sendError(err, next));
};

exports.deleteOrder = (req, res, next) => {
    const id = req.params.id;
    repository.deleteOrder(id)
        .then(result => {
            res.status(200).json({
                message: 'Removed order!',
                order: result
            });
        }).catch(err => sendError(err, next));
};

async function sendError(err, next) {
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    next(err);
}