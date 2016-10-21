/**
 * Created by admin on 21/10/2016.
 */
"use strict";
(function() {

    app.component('welcome', {
        templateUrl: 'js/components/welcome/welcome.component.html',
        bindings: { $router: '<' },
        controller: WelcomeController
    });

    function WelcomeController() {
        var $ctrl = this;
    };

})();
