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
        this.handler.use(bodyParser.json());
        this.handler.use(bodyParser.urlencoded({ extended: false }));

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
        console.log('[STATIC] Directory %s has been mapped as %s', path, route);
    };

    HttpApplicationServer.prototype.addRouter = function(route, router) {
        this.handler.use(route, router);
        console.log('[ROUTER] Added router to %s', route);
    };

    HttpApplicationServer.prototype.map = function(method, route, callback) {
        switch(method) {
            case 'get':
                this.handler.get(route, callback);
                break;
            case 'post':
                this.handler.post(route, callback);
                break;
            case 'put':
                this.handler.put(route, callback);
                break;
            case 'delete':
                this.handler.delete(route, callback);
                break;
            default:
                console.error('Could not map route %s to method', route, method);
                return;
        }

        console.log('[MAPPING] %s %s has been mapped', method, route);
    };

    module.exports = HttpApplicationServer;
})();
