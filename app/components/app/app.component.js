/**
 * Created by admin on 21/10/2016.
 */
"use strict";
(function() {

    app.component('app', {
        templateUrl: 'components/app/app.component.html',
        $routeConfig: [
            { path: '/welcome', name: 'Welcome', component: 'welcome', useAsDefault: true },
            { path: '/upload', name: 'Upload', component: 'scriptUpload' },
            { path: '/scripts', name: 'Scripts', component: 'scripts' }
        ]
    });

})();
