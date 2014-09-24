define([
    "jquery",
    "underscore",
    "backbone"
], function ($, _, Backbone, HeaderTemplate) {
    "use strict";

    var items = [{href: "cancel", clazz: "fi-x", name: "屏蔽"},
        {href: "replace", clazz: "fi-loop", name: "替换"},
        {href: "autoauth", clazz: "fi-torso", name: "认证"}];

    var view = Backbone.View.extend({
        el: "#header",

        template: _.template($('#header-template').html()),
        //template: _.template(HeaderTemplate),
        /*
        events: {
            "click li":   "changeState",
        },

        changeState: function(ev) {
            $(ev.target).parents("li").addClass("active").siblings().removeClass("active");
        },
        */

        render: function() {
            this.$el.html(this.template({items: items}));
        }
    });


    return view;
});

