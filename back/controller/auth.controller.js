const authService = require('../services/auth.service');

exports.signup = (req, res) => {
    authService.signup(req.body).then(r => {
        res.status(200).json(r);
    });
}

exports.login = (req, res) => {
    authService.login(req.body).then(r => {
        res.status(200).json(r);
    });
}
