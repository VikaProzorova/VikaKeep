function sampleSync() {
    var fs = require('fs');

    var package_json = fs.readFileSync('package.json', 'utf8');
    var db_sql       = fs.readFileSync('db.sql', 'utf8');

    console.log('LOG 1');
    console.log('package.json: ', package_json);
    console.log('db.sql: ', db_sql);

    return [ package_json, db_sql ];
}

// console.log('LOG 0');
// console.log(sampleSync());
// console.log('LOG 2');

function sampleCallback(cb) {
    var fs = require('fs');

    fs.readFile('package.json', 'utf8', function(error, package_json) {
        console.log('LOG 2');
        console.log(package_json);

        fs.readFile('db.sql', 'utf8', function(error, db_sql) {
            console.log(db_sql);
            cb([package_json, db_sql]);
        })

    })
}

// console.log('LOG 0');
// sampleCallback(function(data) {
//     console.log(data);
// })
// console.log('LOG X');


function samplePromise() {
    var Promise = require('bluebird');
    var fs      = Promise.promisifyAll(require("fs"));

    var result = [];

    return fs.readFileAsync("package.json", "utf8")
    .then(function(package_json) {
        console.log('LOG 3');
        console.log(package_json);
        result.push(package_json);

        return fs.readFileAsync("db.sql", "utf8");
    })
    .then(function(db_sql) {
        console.log(db_sql);
        result.push(db_sql);

        return result;
    });
}

console.log('LOG 0');
samplePromise().then(function(data) {
    console.log(data);
})
console.log('LOG X');


