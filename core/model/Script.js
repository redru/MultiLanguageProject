/**
 * Created by admin on 23/10/2016.
 */
(() => {
    "use strict";
    let Script = function(name, path, type, src, createdOn) {
        this.name = name ? name : '';
        this.path = path ? path : '';
        this.type = type ? type : '';
        this.src = src ? src : '';
        this.createdOn = createdOn ? createdOn : 0;
    };

    module.exports = Script;
})();
