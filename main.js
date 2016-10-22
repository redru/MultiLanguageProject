/**
 * Created by admin on 19/10/2016.
 */
(() => {
    "use strict";
    const HttpApplicationServer     = require('./core/server/HttpApplicationServer');
    const LogInterceptor            = require('./core/interceptors/LogInterceptor');
    const TransactionInterceptor    = require('./core/interceptors/TransactionInterceptor');
    const Python                    = require('./core/executor/Python');

    (() => {
        global.__dirname = __dirname;
        global.pythonScripts = __dirname + '/scripts/python';
    })();

    Python.configure(global.pythonScripts);

    let server = new HttpApplicationServer();
    server.configure(8080, 'localhost', 'MLS01');

    server.static('/', './app');
    server.static('/node_modules', './node_modules');

    server.use(LogInterceptor);
    server.use(TransactionInterceptor);
    server.addRouter('/api/python', require('./core/routes/PythonRoute'));

    server.start(context => console.log('%s running at http://%s:%s', context.serverName, context.bind, context.port));
})();
