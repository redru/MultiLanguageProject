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
            scriptsList: [],
            processResponse: {}
        };

        this.init();
    };

    ScriptsController.prototype.init = function() {
        this.getScriptsList();
    };

    ScriptsController.prototype.getScriptsList = function() {
        var self = this;

        return this.$http.get('/api/script/find').then(

            function success(response) {
                self.view.scriptsList = response.data.result;
            },

            function error(response) {
                console.error(response.message);
            });
    };

    ScriptsController.prototype.onScriptExecute = function() {
        var self = this;

        if (this.model.script.selected === '')
            return;

        this.$http.post('/api/script/execute/' + this.model.script.selected._id, { data: this.model.script.selected }).then(

            function success(response) {
                self.view.processResponse = response.data;
            },

            function error(response) {
                console.error(response.message);
            });
    };

    ScriptsController.$inject = ['$scope', '$http'];

})();
