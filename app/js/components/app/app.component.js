/**
 * Created by admin on 21/10/2016.
 */
"use strict";
(function() {

    app.component('app', {
        templateUrl: 'js/components/app/app.component.html',
        $routeConfig: [
            { path: '/welcome', name: 'Welcome', component: 'welcome', useAsDefault: true },
            { path: '/script', name: 'Script', component: 'scriptUpload' }
        ]
    });

})();
