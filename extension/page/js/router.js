define([
    "jquery",
    "backbone",
    "vm",
    "views/cancel",
    "views/replace",
    "views/autoauth"
], function ($, Backbone, Vm, CancelView, ReplaceView, AutoAuthView) {
    "use strict";

    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "default",
            "cancel": "default",
            "replace": "replace",
            "autoauth": "autoauth"
        }
    });

    
    var init = function() {

        var router = new AppRouter(); 

        router.on("route:default", function() {
            var view = Vm.create("default", CancelView);
            view.render();
        });

        router.on("route:replace", function() {
            var view = Vm.create("replace", ReplaceView);
            view.render();
        });
        
        router.on("route:autoauth", function() {
            var view = Vm.create("autoauth", AutoAuthView);
            view.render();
        });

        router.on("route", function() {
             console.log(window.location.hash);
             $(document).foundation();
        });
        
    };

    return {init:init};

});


