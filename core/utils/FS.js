/**
 * Created by admin on 23/10/2016.
 */
"use strict";
(() => {
    const fs        = require('fs');
    const mkdirp    = require('mkdirp');

    function saveScript(path, name, src) {
        path = path.replace(/\./gi, '/');

        return new Promise((resolve, reject) => {
            mkdirp(global.pythonScripts + '/' + path, (err) => {
                if (err)
                    return reject(err);

                return err ? reject(err) : resolve();
            });
        }).then(() => {
            fs.writeFile(global.pythonScripts + '/' + path + '/' + name, src, (err) => {
                return err ? Promise.reject(err) : Promise.resolve();
            });
        });
    }

    module.exports = {
        saveScript: saveScript
    };
})();
