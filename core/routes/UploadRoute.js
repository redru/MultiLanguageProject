/**
 * Created by admin on 23/10/2016.
 */
"use strict";
(() => {
    const Python        = require('../executor/Python');
    const Mongo         = require('../dao/Mongo');
    const Script        = require('../model/Script');

    let router          = require('express').Router();

    router.post('/', (req, res) => {
        let script = new Script(req.body.data.name, req.body.data.path, req.body.data.type, req.body.data.src);

        Mongo.saveScript(script)

            .then((data) => {
                return res.status(200).json({ message: 'Complete' });
            })

            .catch((reason) => {
                console.log(reason);
                return res.status(500).json({ message: reason });
            });
    });

    module.exports = router;
})();
