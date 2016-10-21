/**
 * Created by admin on 19/10/2016.
 */
(() => {
    "use strict";
    const HttpApplicationServer     = require('./core/server/HttpApplicationServer');

    function configureGlobals() {
        global.__dirname = __dirname;
        global.pythonScripts = __dirname + '/scripts/python';
    }

    configureGlobals();

    let server = new HttpApplicationServer();
    server.configure(8080, 'localhost', 'MLS01');
    server.start(context => console.log('%s running at http://%s:%s', context.serverName, context.bind, context.port));

    /* Python.configure(global.pythonScripts);
    Python.start();

    let server = startServer(app, );

    function getTime(req, res) {
        Python.execute('time', [], data => res.status(200).send(data));
    } */

})();
