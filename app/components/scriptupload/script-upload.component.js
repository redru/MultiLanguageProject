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

    function ScriptUploadController($scope, $http) {
        $scope.$ctrl = this;
        this.$http = $http;

        this.model = {
            scriptResponse: {}
        };
    };

    ScriptUploadController.prototype.onUploadScript = function() {
        var self = this;

        this.$http.get('/api/python?path=time.math.lol.rag.time.py').then(
            function success(response) {
                self.model.scriptResponse = response.data;
            },

            function error() {
                console.error('Error');
            });
    };

    ScriptUploadController.$inject = ['$scope', '$http'];

})();
