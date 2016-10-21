/**
 * Created by Luca Zenobi on 21/10/2016.
 */
(() => {
    "use strict";
    const spawn     = require('child_process').spawn;
    const crypto    = require('crypto');

    let Python = function() {

    };

    Python.prototype.configure = function(scriptsPath) {
        this.scriptsPath = scriptsPath;
    };

    Python.prototype.start = function() {

    };

    Python.prototype.execute = function(scriptName, args, callback) {
        let script = spawn('python', [ this.scriptsPath + '/time.py' ]);

        script.stdout.on('data', (data) => {
            let response = data.toString('utf8');
            let id = response.substring(0, response.indexOf('@')).replace('\r\n', '');
            let message = response.substring(response.indexOf('@') + 1);

            if (this.callbacks[id]) {
                this.callbacks[id](message);
                delete this.callbacks[id];
            }
        });

        script.stderr.on('data', data => console.log('[time.py] error: %s', data));

        script.on('close', code => console.log(`[time.py] child process exited with code ${code}`));
    };

    module.exports = new Python();
})();
