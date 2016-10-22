/**
 * Created by admin on 22/10/2016.
 */
"use strict";
(() => {
    const crypto        = require('crypto');

    function TransactionInterceptor(req, res, next) {
        req.transaction = {
            trackId: crypto.createHash('sha256').update(randomValueHex(24), 'utf8').digest('hex')
        };

        return next();
    }

    function randomValueHex(len) {
        return crypto.randomBytes(Math.ceil(len/2)).toString('hex').slice(0,len);
    }

    module.exports = TransactionInterceptor;
})();
