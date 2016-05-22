var express = require('express');
var router = express.Router();

var q = require('q');

var authConfig = global.config.auth;

router.post('/auth/check', (req, res) => {
    if(req.body == null || req.body.token == null){
        res.sendStatus(401);
    }
});

router.get('/auth/redirect', (req, res) => {
    res.redirect(authConfig.login_url + '?return_url=' + encodeURIComponent(global.config.appHost + '/auth/loginSuccess'));
});

router.get('/auth/loginSuccess', (req, res) => {
    console.log(req.query);
    res.cookie('ucinetid_auth', req.query.ucinetid_auth);
    res.redirect('http://google.com')
});

module.exports = router;
