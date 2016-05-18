var mysql = require('mysql');
var q = require('q');


function Database(database) {
    this.connection = mysql.createConnection({
        host: global.config.database.host,
        user: global.config.database.user,
        password: global.config.database.password,
        database: database
    });
};

Database.prototype.testConnection = function () {
    var deffered = q.defer();

    this.connection.connect(function(err) {
        if (err) {
            deffered.reject(err);
        } else {
            deffered.resolve();
        }
    });
    return deffered.promise;
};

Database.prototype.query = function (query, values = []) {
    var deffered = q.defer();

    this.connection.query(query, values, function(err, results, fields) {
        if (err) {
            deffered.reject(err);
        } else {
            deffered.resolve(results, fields);
        }
    });
    return deffered.promise;
};
