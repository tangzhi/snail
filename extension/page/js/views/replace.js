define([
    "jquery",
    "underscore",
    "backbone",
    "localStorage",
    "text!templates/replace.html",
    "text!templates/replace-item.html"
], function ($, _, Backbone, LocalStorage, ReplaceTemplate, ItemTemplate) {
    "use strict";

    var Tentacle = Backbone.Model.extend({
        defaults: function() {
            return {
                order: Tentacles.nextOrder(),
            };
        }
    });

    var TentacleList = Backbone.Collection.extend({

        model: Tentacle,

        localStorage: new LocalStorage("snail-replace"),

        nextOrder: function() {
            if (!this.length) return 1;
            return this.last().get('order') + 1;
        },

        comparator: 'order'

    });

    var Tentacles = new TentacleList;

    var TentacleView = Backbone.View.extend({
        
        tagName: "tr",

        template: _.template(ItemTemplate),

        events: {
            "click a.remove"    :   "clear",
            "click a.recommend" :   "recommend"
        },

        initialize: function() {
            this.listenTo(this.model, 'destroy', this.remove);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        clear: function() {
            this.model.destroy();
            return false;
        },

        recommend: function() {
            return false;
        }

    });

    var ReplaceView = Backbone.View.extend({

        el: "#content",

        template: _.template(ReplaceTemplate),

        events: {
            "click a.replace-add"    :   "addTentacle"
        },

        initialize: function() {
            
            this.listenTo(Tentacles, 'add', this.addOne);
            //this.listenTo(Tentacles, 'reset', this.addAll);
            //this.listenTo(Tentacles, 'all', this.render);

        },

        render: function() {
            this.$el.html(this.template());

            this.oldUrl = $("#old_url");
            this.newUrl = $("#new_url");
            this.desc = $("#desc");

            if (Tentacles.length) {
                this.addAll();
            }else {
                Tentacles.fetch();
            }
            //this.addAll();
            console.log("go here");
        },

        addOne: function(todo) {
            console.log("go addOne");
            var view = new TentacleView({model: todo});
            this.$("#replace-list").append(view.render().el);
        },

        addAll: function() {
            console.log("go addAll");
            Tentacles.each(this.addOne, this);
        },

        addTentacle: function(event) {
            
            var oldUrl = this.oldUrl.val();
            var newUrl = this.newUrl.val();
            var desc = this.desc.val();

            console.log("old url:"+oldUrl+",new url:"+newUrl+",desc:"+desc);

            if (oldUrl ==="" || newUrl === "" || desc === "") {
                return;
            }

            Tentacles.create({old_url: oldUrl, new_url: newUrl, desc: desc});

            return false;

        }

    });

    return ReplaceView;

    /*
    var view = Backbone.View.extend({
        el: "#content",

        template: _.template($('#replace-template').html()),

        render: function() {
            this.$el.html(this.template());
        }

    });

    return view;
    */
});

