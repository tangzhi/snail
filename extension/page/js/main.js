
require.config({
    paths: {
        // Major libraries
        jquery: "vendor/jquery",
        foundation: "foundation.min",
        underscore: "../../lib/underscore-min",
        backbone: "../../lib/backbone-min",
        // APIe
        localStorage: "../../lib/backbone.localStorage",
        //
        // Require.js plugins
        text: "require/text",
        // jquery plugins
        // External services
        templates: "../templates"
  }

});

require(["jquery", "foundation", 
        "views/header", "router", "vm"], function ($, foundation, HeaderView, Router, Vm) {

    //render header
    //var header = new HeaderView();
    //header.render();
    var view = Vm.create("header", HeaderView);
    view.render();

    //创建路由
    Router.init();

    //Backbone.history.start({pushState: true, hashChange: false});
    Backbone.history.start();

    console.log("...欢迎使用蜗牛宝宝...");

});



