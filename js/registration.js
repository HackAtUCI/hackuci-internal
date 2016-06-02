var database = require(global.rootDir + '/js/database.js');
var db = new database(global.config.registration.registrationDatabaseName);

const registerTable = global.config.registration.registrationTableName;

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    db.query('select fname, lname, email from ' + registerTable + ";", []).then(
        function onSuccess(results, fields) {
            res.json(results);
        },
        function onError(err) {
            res.json(err);
        }
    )
});

router.post('/', function(req, res) {
    var email = req.body.email;
    if (email == null) {
        res.sendStatus(400);
    }
    db.query('select * from ' + registerTable + ' where email = ?', [email]).then(
        function onSuccess(results, fields) {
            res.json(results[0]);
        },
        function onError(err){
            res.json(err).status(500);
        });
});

router.post('/checkin', function(req, res) {
    var email = req.body.email;
    if (email == null) {
        res.sendStatus(400);
    }
    db.query('update ' + registerTable + ' set confirmed_presence = 1 where email = ?', [email]).then(
        function onSuccess(results, fields) {
            if (results.affectedRows === 1){
                res.json({email: email});
                return;
            }
            res.sendStatus(400);
        },
        function onError(err){
            res.json(err).status(500);
        }
    );
});

router.post('/walkin', function(req, res) {
    var walkin = req.body.walkin;
    if (walkin == null) {
        res.sendStatus(400);
        return
    }

    const fname = walkin.fname || 'bleh';
    const lname = walkin.lname || 'bleh';
    const email = walkin.email || 'bleh';

    db.query("insert into " + registerTable + " values (?, ?, ?, ?, ?, ?, ?, ?)", [fname, lname, email, 'bleh', 'bleh', 'bleh', 1 , 2]).then(
        function onSuccess(results, fields) {
            if (results.affectedRows === 1) {
                res.sendStatus(200);
                return
            }
            res.sendStatus(400);
        },
        function onError(err) {
            res.sendStatus(500);
        }
    );
});




module.exports = router;
