define([
    "jquery",
    "underscore",
    "backbone",
    "text!templates/header.html"
], function ($, _, Backbone, HeaderTemplate) {
    "use strict";
    
    var Tent = Backbone.Model.extend();

    var TentList = Backbone.Collection.extend({
        model: Tent
    });

    var Tents = new TentList([
        {href: "cancel", clazz: "fi-x", name: "屏蔽"},
        {href: "replace", clazz: "fi-loop", name: "替换"}/*,
        {href: "autoauth", clazz: "fi-torso", name: "认证"}*/
    ]);

    var TentView = Backbone.View.extend({
        
        tagName: "li",
        
        template: _.template("<a href='#<%= href %>'><i class='<%= clazz %>'></i> <%= name %></a>"),

        events: {
            "click a":  "active"
        },

        active: function(ev) {
            this.$el.addClass("active")
                    .siblings().removeClass("active");
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }


    });

    var HeaderView = Backbone.View.extend({ 

        el: "#header",

        template: _.template(HeaderTemplate),

        initialize: function() {
            this.hash = window.location.hash;

            if (this.hash === "") {
                this.hash="#cancel";
            }
        },

        addOne: function(tent) {
            var view = new TentView({model: tent});
            var item = view.render().$el;
            if (this.hash.substring(1) === tent.get("href")) {
                item.addClass("active");
            }
            this.$("#tent-list").append(item);
        },

        addAll: function() {
            Tents.each(this.addOne, this);
        },

        render: function() {
            this.$el.html(this.template());
            this.addAll();
        }

    });

    return HeaderView;
});

