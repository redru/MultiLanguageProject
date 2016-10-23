/**
 * Created by admin on 21/10/2016.
 */
"use strict";
(function() {

    //@ ScriptUploadController
    app.component('scriptUpload', {
        templateUrl: 'components/scriptupload/script-upload.component.html',
        bindings: { $router: '<' },
        controller: ScriptUploadController
    });

    function ScriptUploadController($scope, $http) {
        $scope.$ctrl = this;
        this.$http = $http;

        this.model = {
            script: {
                selected: '',
                upload: new Script()
            }
        };
        this.view = {
            scriptResponse: {}
        }
    };

    ScriptUploadController.prototype.onScriptUpload = function() {
        var self = this;

        this.$http.post('/api/script/upload', { data: this.model.script.upload }).then(
            function success(response) {
                self.view.scriptResponse = response.data;
            },

            function error() {
                console.error('Error');
            });
    };

    ScriptUploadController.$inject = ['$scope', '$http'];

})();
