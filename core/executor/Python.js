/**
 * Created by Luca Zenobi on 21/10/2016.
 */
"use strict";
(() => {
    const spawn     = require('child_process').spawn;
    const crypto    = require('crypto');

    let Python = function() {
        this.scriptsPath = '/';
    };

    Python.prototype.configure = function(scriptsPath) {
        this.scriptsPath = scriptsPath;
    };

    Python.prototype.execute = function(path, args, callback) {
        if (typeof callback !== 'function')
            throw new Error('Callback is not a function');

        let executionInfo = new ExecutionInfo();
        executionInfo.timeStart = getTimeInMillis();

        let fsPath = path.replace(/\.(?=[^.]*\.)/gi, '/'); // Replace all dots
        console.log('[SCRIPT] Python: executing %s', fsPath);
        let script = spawn('python', [ this.scriptsPath + '/' + fsPath ].concat(args), { detached: false });

        // On data callback (status ok)
        script.stdout.on('data', (data) => {
            let strData = data.toString('utf8');
            executionInfo.result = strData;
            console.log('[SCRIPT] Python process - data: %s', strData);
        });

        // On error callback
        script.stderr.on('data', (error) => {
            let strError = error.toString().replace(/\n$/, '');
            executionInfo.error = strError;
            console.error('[SCRIPT] Python process - error: %s', strError);
        });

        // On close callback
        script.on('close', (code) => {
            executionInfo.timeEnd = getTimeInMillis();
            executionInfo.deltaTime = executionInfo.timeEnd - executionInfo.timeStart;
            executionInfo.code = code;

            console.log('[SCRIPT] Python process - close: process finished with status code %s', code);
            return callback(executionInfo.error, executionInfo);
        });

        script.stdin.write('');
        script.stdin.end();
    };

    let ExecutionInfo = function() {
        this.code = -1;
        this.error = null;
        this.timeStart = 0;
        this.timeEnd = 0;
        this.deltaTime = 0;
        this.result = null;
    };

    function getTimeInMillis() {
        let hrTime = process.hrtime();
        return hrTime[0] * 1000 + hrTime[1] / 1000000;
    }


    module.exports = new Python();
})();
