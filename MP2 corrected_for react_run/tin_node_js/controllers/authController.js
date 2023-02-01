const ClientRepository = require('../repository/sequelize/ClientRepository');
const authUtil = require("../util/authUtils");

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    ClientRepository.findByEmail(email)
        .then(cl => {
            if(!cl) {
                res.render('index', {
                    navLocation: '',
                    loginError: "Invalid email address or password"
                })
            } else if(authUtil.comparePasswords(password, cl.password) === true) {
                req.session.loggedUser = cl;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: "Invalid email address or password"
                })
            }
        })
        .catch(err => {
            console.log(err);
        });

}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}