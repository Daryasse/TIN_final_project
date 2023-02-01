const OrderRepository = require('../repository/sequelize/OrderRepository');
const BookRepository = require('../repository/sequelize/BookRepository');
const ClientRepository = require('../repository/sequelize/ClientRepository');

exports.showOrderList = (req, res, next) =>{
    OrderRepository.getOrders().then(orders =>{
        res.render('pages/orders/orders', {
            orders: orders,
            navLocation: 'orders'});
    });
}
exports.showOrderForm = (req, res, next) =>{
    let allBooks, allClients;
    BookRepository.getBooks()
        .then(books => {
            allBooks =books;
            return ClientRepository.getClients();
        })
        .then(clients => {
            allClients = clients;
            res.render('pages/orders/orders-form', {
                ord: {},
                allClients: allClients,
                allBooks: allBooks,
                pageTitle: 'New order',
                btnLabel: 'Add order',
                formMode: 'createNew',
                formAction: '/orders/add',
                navLocation: 'orders',
                errors: []
            });
        });
}

exports.showOrderEdit = (req, res, next) =>{
    const orderId = req.params.IdOrder;
    let allBooks, allClients;
    BookRepository.getBooks()
        .then(books => {
            allBooks =books;
            return ClientRepository.getClients();
        })
        .then(clients => {
            allClients = clients;
            return OrderRepository.getOrderById(orderId);
        })
        .then(ord => {
            res.render('pages/orders/orders-form', {
                ord: ord,
                allClients: allClients,
                allBooks: allBooks,
                pageTitle: 'Edit order',
                btnLabel: 'Edit order',
                formMode: 'edit',
                formAction: '/orders/edit',
                navLocation: 'orders',
                errors: []
            });
        });
}

exports.showOrderDetails = (req, res, next) =>{
    const orderId = req.params.IdOrder;
    let allBooks, allClients;
    BookRepository.getBooks()
        .then(books => {
            allBooks =books;
            return ClientRepository.getClients();
        })
        .then(clients => {
            allClients = clients;
            return OrderRepository.getOrderById(orderId);
        })
        .then(ord => {
            res.render('pages/orders/orders-form', {
                ord: ord,
                allClients: allClients,
                allBooks: allBooks,
                pageTitle: 'Order details',
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'orders',
                errors: []
            });
        });
}

exports.addOrder = (req, res, next) =>{
    const orderDate = {...req.body};
    let allBooks, allClients;
    BookRepository.getBooks()
        .then(books =>{
            allBooks = books;
            return ClientRepository.getClients();
        })
        .then(clients => {
            allClients = clients
            return OrderRepository.createOrder(orderDate)
                .then(result => res.redirect('/orders'))
                .catch(err =>{
                    err.errors.forEach(e => {
                        if(e.path.includes('date') && (e.message == 'Validation isBefore on date failed')){
                            e.message = "The date cannot be from the future.";
                        }
                    });
                    res.render('pages/orders/orders-form', {
                        ord: orderDate,
                        allClients: allClients,
                        allBooks: allBooks,
                        pageTitle: 'New order',
                        btnLabel: 'Add order',
                        formMode: 'createNew',
                        formAction: '/orders/add',
                        navLocation: 'orders',
                        errors: err.errors
                    })
                });
        });

}

exports.updateOrder = (req, res, next) =>{
    const orderId = req.body._id;
    const orderData = {...req.body};
    let allBooks, allClients;
    BookRepository.getBooks()
        .then(books =>{
            allBooks = books;
            return ClientRepository.getClients();
        })
        .then(clients => {
            allClients = clients;
            OrderRepository.updateOrder(orderId, orderData)
                .then(result => res.redirect('/orders'))
                .catch(err => {
                    err.errors.forEach(e => {
                        if(e.path.includes('date') && (e.message == 'Validation isBefore on date failed')){
                            e.message = "The date cannot be from the future.";
                        }
                    });
                    res.render('pages/orders/orders-form', {
                        ord: orderData,
                        allBooks: allBooks,
                        allClients: allClients,
                        pageTitle: 'Edit order',
                        btnLabel: 'Edit order',
                        formMode: 'createNew',
                        formAction: '/orders/edit',
                        navLocation: 'orders',
                        errors: err.errors
                    })
                });
        });
}

exports.deleteOrder = (req, res, next) =>{
    const orderId = req.params.IdOrder;
    OrderRepository.deleteOrder(orderId)
        .then( () =>{
            res.redirect('/orders');
        });
}