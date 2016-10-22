/**
 * Created by admin on 22/10/2016.
 */
"use strict";
(() => {
    function LogInterceptor(req, res, next) {
        console.log('[%s] %s -> %s', new Date(), req.method, req.originalUrl);
        return next();
    }

    module.exports = LogInterceptor;
})();
