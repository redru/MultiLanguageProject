/**
 * Created by admin on 19/10/2016.
 */
(() => {
    "use strict";
    const http          = require('http');
    const express       = require('express');
    const bodyParser    = require('body-parser');

    const Python        = require('./core/PythonLoader');

    configureGlobals();

    Python.configure(global.pythonScripts);
    Python.start();

    let app = configure();
    let server = startServer(app, 8080, 'localhost');

    function configureGlobals() {
        global.__dirname = __dirname;
        global.pythonScripts = __dirname + '/scripts/python';
    }

    function configure() {
        let expressApp = express();

        expressApp.get('/time', getTime);

        return expressApp;
    }

    function startServer(handler, port, bind) {
        let httpServer = http.createServer(handler).listen(port, bind, () => {
            console.log('Server listening at http://%s:%s', bind, port);
        });
    }

    function getTime(req, res) {
        Python.execute('time', [], data => res.status(200).send(data));
    }

})();
