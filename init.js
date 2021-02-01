const sequelize = require('sequelize');

initMysql()

function initMysql() {
    console.log("initMysql")
    global.db = new sequelize('Fashion', 'root', 'root', {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        define: {
            freezeTableName: true,
            timestamps: false
        },
        sync: { force: false }

    });

    global.db.authenticate()
        .then(function (err) {
            console.log('Connected to mysql db.');
        })
        .catch(function (err) {
            console.log({ error: 'Unable to connect to the mysql db:', err }, "initMysql");
        });
}
