/**
 * Created by admin on 22/10/2016.
 */
"use strict";
(() => {
    const Python        = require('../executor/Python');
    let router          = require('express').Router();

    router.get('/', (req, res) => {
        Python.execute(req.query.path, [], (err, processInfo) => {
            if (err)
                return res.status(500).json({ message: err });

            return res.status(200).json({ transaction: req.transaction, process: processInfo, message: 'Complete' });
        });
    });

    module.exports = router;
})();
