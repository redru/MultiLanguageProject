/**
 * Created by admin on 21/10/2016.
 */
"use strict";
(function() {

    app.component('scriptUpload', {
        templateUrl: 'components/scriptupload/script-upload.component.html',
        bindings: { $router: '<' },
        controller: ScriptUploadController
    });

    function ScriptUploadController() {
        var $ctrl = this;
    };

})();
