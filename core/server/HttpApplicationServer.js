/**
 * Created by Luca Zenobi on 21/10/2016.
 */
"use strict";
(() => {
    const http          = require('http');
    const express       = require('express');
    const bodyParser    = require('body-parser');

    const Context       = require('./Context');

    let HttpApplicationServer = function() {
        this.context = new Context(8080, 'localhost', 'HttpApplicationServer');
        this.handler = null;
        this.server = null;
    };

    HttpApplicationServer.prototype.configure = function(port, bind, serverName) {
        if (port)
            this.context.port = port;

        if (bind)
            this.context.bind = bind;

        if (serverName)
            this.context.serverName = serverName;

        this.handler = express();
        this.server = http.createServer(this.handler);
    };

    HttpApplicationServer.prototype.start = function(callback) {
        this.server.listen(this.context.port, this.context.bind, () => {
            if (callback && typeof callback === 'function')
                callback(this.context);
        });
    };

    HttpApplicationServer.prototype.use = function(middleware) {
        if (typeof middleware !== 'function')
            throw new Error('The middleware is not a function');

        this.handler.use(middleware);
    };

    HttpApplicationServer.prototype.static = function(route, path) {
        this.handler.use(route, express.static(path));
    };

    HttpApplicationServer.prototype.map = function() {

    };

    HttpApplicationServer.prototype.unmap = function() {

    };

    module.exports = HttpApplicationServer;
})();
