/**
 * Created by admin on 23/10/2016.
 */
(() => {
    "use strict";
    const mongodb       = require('mongodb');
    const MongoClient   = require('mongodb').MongoClient;
    const assert        = require('assert');

    let Mongo = function() {
        this.db = null;
        this.collections = null;
    };

    Mongo.prototype.init = function(url) {
        return new Promise((resolve) => {
            MongoClient.connect(url, (err, db) => {
                assert.equal(null, err);
                console.log('[MONGO] Successfully connected to %s', url);

                this.db = db;
                this.collections = {
                    scripts: this.db.collection('scripts')
                };

                return resolve();
            });
        });
    };

    Mongo.prototype.getScriptsList = function() {
        return new Promise((resolve, reject) => {
            this.collections.scripts.find({}).toArray(function(err, docs) {
                return err ? reject(err) : resolve(docs);
            });
        }).catch((reason) => {
            return Promise.reject(reason);
        });
    };

    Mongo.prototype.getScript = function(id) {
        return new Promise((resolve, reject) => {
            this.collections.scripts.find({ _id: mongodb.ObjectID(id) }).next((err, doc) => {
                return err ? reject(err) : resolve(doc);
            });
        });
    };

    Mongo.prototype.saveScript = function(script) {
        script.src = new Buffer(script.src).toString('base64');
        script.createdOn = new Date();
        script.averageExecutionTime = 0;
        script.timesExecuted = 0;

        return this.collections.scripts.insertOne(script).then((data) => {
            console.log('[MONGO] Inserted new script %s (%s)', script.name, script.type);
            return Promise.resolve(script);
        }).catch((reason) => {
            return Promise.reject(reason);
        });
    };

    Mongo.prototype.updateScriptMetadata = function(doc, processInfo) {
        let metaData = {
            $set: { lastExecuted: new Date(), averageExecutionTime: (doc.averageExecutionTime + processInfo.deltaTime) / (doc.timesExecuted + 1) },
            $inc: { timesExecuted: 1 }
        }

        return this.collections.scripts.update({ _id: doc._id }, metaData).then((data) => {
            console.log('[MONGO] Updated script %s metadata', id);
            return Promise.resolve(script);
        }).catch((reason) => {
            return Promise.reject(reason);
        });
    };

    module.exports = new Mongo();
})();
