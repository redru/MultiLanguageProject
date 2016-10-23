/**
 * Created by admin on 23/10/2016.
 */
"use strict";
(() => {
    const fs        = require('fs');

    function saveScript(path, name, src) {
        path = path.replace(/\./gi, '/');

        return new Promise((resolve, reject) => {
            fs.mkdir(global.pythonScripts + '/' + path, {}, (err) => {
                return err ? reject(err) :resolve();
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
