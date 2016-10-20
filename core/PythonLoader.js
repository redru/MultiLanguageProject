/**
 * Created by admin on 19/10/2016.
 */
(() => {
    "use strict";
    const spawn     = require('child_process').spawn;
    const crypto    = require('crypto');

    let PythonLoader = function() {
        this.services = {};
        this.callbacks = {};
        this.scriptsPath = '';
    };

    PythonLoader.prototype.configure = function(scriptsPath) {
        this.scriptsPath = scriptsPath;
    };

    PythonLoader.prototype.start = function() {
        let time = spawn('python', [ this.scriptsPath + '/time.py' ]);

        time.stdout.on('data', (data) => {
            let response = data.toString('utf8');
            let id = response.substring(0, response.indexOf('@')).replace('\r\n', '');
            let message = response.substring(response.indexOf('@') + 1);

            if (this.callbacks[id]) {
                this.callbacks[id](message);
                delete this.callbacks[id];
            }
        });

        time.stderr.on('data', data => console.log('[time.py] error: %s', data));

        time.on('close', code => console.log(`[time.py] child process exited with code ${code}`));

        this.services['time'] = time;
        console.log('Script "%s" caricato correttamente', 'time.py');
    };

    PythonLoader.prototype.execute = function(scriptName, args, callback) {
        let script = this.services[scriptName];

        if (!script)
            throw new Error('Script "%s" non esistente', scriptName);

        if (typeof callback !== 'function')
            throw new Error('Callback non definita');

        let id = crypto.createHash('sha256').update(Date.now().toString()).digest('hex');

        this.callbacks[id] = callback;

        script.stdin.write(id + '@\n');
    };

    module.exports = new PythonLoader();
})();
