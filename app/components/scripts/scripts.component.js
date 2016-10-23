/**
 * Created by admin on 21/10/2016.
 */
"use strict";
(function() {

    //@ ScriptsController
    app.component('scripts', {
        templateUrl: 'components/scripts/scripts.component.html',
        bindings: { $router: '<' },
        controller: ScriptsController
    });

    function ScriptsController($scope, $http) {
        $scope.$ctrl = this;
        this.$http = $http;

        this.model = {
            script: {
                selected: ''
            }
        };
        this.view = {
            scriptResponse: {}
        }
    };

    ScriptsController.prototype.onScriptExecute = function() {
        var self = this;

        if (this.model.script.selected === '')
            return;

        this.$http.get('/api/python?path=' + this.model.script.selected).then(
            function success(response) {
                self.view.scriptResponse = response.data;
            },

            function error() {
                console.error('Error');
            });
    };

    ScriptsController.$inject = ['$scope', '$http'];

})();
