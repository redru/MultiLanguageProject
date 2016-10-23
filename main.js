/**
 * Created by admin on 19/10/2016.
 */
(() => {
    "use strict";
    const fs                        = require('fs');

    const Mongo                     = require('./core/dao/Mongo');
    const HttpApplicationServer     = require('./core/server/HttpApplicationServer');
    const LogInterceptor            = require('./core/interceptors/LogInterceptor');
    const TransactionInterceptor    = require('./core/interceptors/TransactionInterceptor');
    const Python                    = require('./core/executor/Python');

    (() => {
        global.__dirname = __dirname;
        global.pythonScripts = __dirname + '/scripts/python';
    })();

    let server = new HttpApplicationServer();

    Mongo.init('mongodb://localhost:27017/mlst')

        .then(() => {
            Python.configure(global.pythonScripts);
            server.start(context => console.log('[SERVER] %s running at http://%s:%s', context.serverName, context.bind, context.port));
        });

    server.configure(8080, 'localhost', 'MLS01');

    server.static('/', './app');
    server.static('/node_modules', './node_modules');

    server.use(LogInterceptor);
    server.use(TransactionInterceptor);
    server.addRouter('/api/script', require('./core/routes/ScriptRoute'));
})();
