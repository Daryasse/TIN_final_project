const ClientRepository = require ('../repository/sequelize/ClientRepository');

exports.showClientList = (req, res, next) =>{
    ClientRepository.getClients().then(clients =>{
        res.render('pages/clients/clients', {
            clients: clients,
            navLocation: 'clients'});
    });
}
exports.showClientForm = (req, res, next) =>{
    res.render('pages/clients/clients-form', {
        cl: {},
        pageTitle: 'New client',
        btnLabel: 'Add client',
        formMode: 'createNew',
        formAction: '/clients/add',
        navLocation: 'clients',
        errors: []
}   );
}

exports.showClientEdit = (req, res, next) =>{
    const clientId = req.params.IdClient;
    ClientRepository.getClientById(clientId)
        .then( cl => {
            res.render('pages/clients/clients-form', {
                cl: cl,
                formMode: 'edit',
                pageTitle: 'Edit client',
                btnLabel: 'Edit client',
                formAction: '/clients/edit',
                navLocation: 'clients',
                errors: []
            });
        });
}

exports.showClientDetails = (req, res, next) =>{
    const clientId = req.params.IdClient;
    ClientRepository.getClientById(clientId)
        .then(cl => {
            res.render('pages/clients/clients-form', {
                cl: cl,
                formMode: 'showDetails',
                pageTitle: 'Client details',
                formAction: '',
                navLocation: 'clients',
                errors: []
            });
        });
}

exports.addClient = (req, res, next) => {
    const clientDate = { ...req.body};
    ClientRepository.createClient(clientDate)
        .then (result => {
            res.redirect('/clients');
        })
        .catch (err => {
                err.errors.forEach(e => {
                if(e.path.includes('email') && e.type == 'unique violation') {
                    e.message = "The email address you entered is already in use.";
                }
                if(e.path.includes('birthdate') && (e.message == 'Validation isBefore on birthdate failed')){
                    e.message = "The date cannot be from the future.";
                }
            });
            res.render('pages/clients/clients-form', {
                cl: clientDate,
                pageTitle: 'New client',
                btnLabel: 'Add client',
                formMode: 'createNew',
                formAction: '/clients/add',
                navLocation: 'clients',
                errors: err.errors
            })

        });
};

exports.updateClient = (req, res, next) => {
    const clientId = req.body._id;
    const clientData = {...req.body};
    ClientRepository.updateClient(clientId, clientData)
        .then ( result => {
            res.redirect('/clients');
        })
        .catch(err => { err.errors.forEach( e => {
                if(e.path.includes('email') && e.type == 'unique violation') {
                    e.message = "The email address you entered is already in use.";
                }
                if(e.path.includes('birthdate') && (e.message == 'Validation isBefore on birthdate failed')){
                    e.message = "The date cannot be from the future.";
                }
            });
            res.render('pages/clients/clients-form', {
                cl: clientData,
                formMode: 'createNew',
                pageTitle: 'Edit client',
                btnLabel: 'Edit client',
                formAction: '/clients/edit',
                navLocation: 'clients',
                errors: err.errors
            });
        })
};

exports.deleteClient = (req, res, next) => {
    const clientId = req.params.IdClient;
    ClientRepository.deleteClient(clientId)
        .then( () => {
            res.redirect('/clients')
        })
};