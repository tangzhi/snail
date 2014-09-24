
require.config({
    paths: {
        // Major libraries
        jquery: "vendor/jquery",
        foundation: "foundation.min",
        underscore: "../../lib/underscore-min",
        backbone: "../../lib/backbone-min",
        // APIe
        //
        // Require.js plugins
        text: "require/text",
        // jquery plugins
        // External services
        templates: "../templates"
  }

});

require(["jquery", "foundation", 
        "views/header", "router"], function ($, foundation, HeaderView, Router) {

    //render header
    var header = new HeaderView();
    header.render();

    //创建路由
    Router.init();

    //Backbone.history.start({pushState: true, hashChange: false});
    Backbone.history.start();

    console.log("...欢迎使用蜗牛宝宝...");

});



