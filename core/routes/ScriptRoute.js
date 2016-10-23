/**
 * Created by admin on 23/10/2016.
 */
"use strict";
(() => {
    const FSUtils       = require('../utils/FS');
    const Python        = require('../executor/Python');
    const Mongo         = require('../dao/Mongo');
    const Script        = require('../model/Script');

    let router          = require('express').Router();

    router.post('/upload', (req, res) => {
        let script = new Script(req.body.data.name, req.body.data.path, req.body.data.type, req.body.data.src);
        let promises = [];

        promises.push(Mongo.saveScript(script));
        promises.push(FSUtils.saveScript(script.path, script.name, req.body.data.src));

        return Promise.all(promises)

            .then((data) => {
                return res.status(200).json({ message: 'Complete' });
            })

            .catch((reason) => {
                console.log(reason);
                return res.status(500).json({ message: reason });
            });
    });

    router.get('/find', (req, res) => {
        let query = req.query;

        Mongo.getScriptsList()

            .then((list) => {
                return res.status(200).json({ result: list, message: 'Complete' });
            })

            .catch((reason) => {
                return res.status(500).json({ message: reason });
            });
    });

    router.post('/execute/:id', (req, res) => {
        let script = req.body.data;

        Mongo.getScript(req.params.id)

            .then((doc) => {
                Python.execute(doc.path + '.' + doc.name, [], (err, processInfo) => {
                    if (err)
                        return res.status(500).json({ message: err });

                    return res.status(200).json({ transaction: req.transaction, process: processInfo, message: 'Complete' });
                });

            })

            .catch((reason) => {
                return res.status(500).json({ message: reason });
            });
    });

    module.exports = router;
})();
