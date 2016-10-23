/**
 * Created by admin on 23/10/2016.
 */
(() => {
    "use strict";
    const MongoClient   = require('mongodb').MongoClient;
    const assert        = require('assert');

    let Mongo = function() {
        this.db = null;
    };

    Mongo.prototype.init = function(url) {
        return new Promise((resolve) => {
            MongoClient.connect(url, (err, db) => {
                assert.equal(null, err);
                console.log('[MONGO] Successfully connected to %s', url);

                this.db = db;
                return resolve();
            });
        });
    };

    Mongo.prototype.getScriptsList = function() {
        return this.db.collection('scripts').find({}).then((scripts) => {
            // console.log('[MONGO] Inserted new script %s (%s)', script.name, script.type);
            return Promise.resolve(scripts);
        }).catch((reason) => {
            return Promise.reject(reason);
        });
    };

    Mongo.prototype.saveScript = function(script) {
        script.src = new Buffer(script.src).toString('base64');
        script.createdOn = Date.now();

        return this.db.collection('scripts').insertOne(script).then((data) => {
            console.log('[MONGO] Inserted new script %s (%s)', script.name, script.type);
            return Promise.resolve(script);
        }).catch((reason) => {
            return Promise.reject(reason);
        });
    };

    module.exports = new Mongo();
})();
