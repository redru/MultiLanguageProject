/**
 * Created by Luca Zenobi on 21/10/2016.
 */
(() => {
    "use strict";
    let Context = function(port, bind, serverName) {
        this.port = port ? port : 0;
        this.bind = bind ? bind : '';
        this.serverName = serverName ? serverName : '';
    };

    module.exports = Context;
})();
