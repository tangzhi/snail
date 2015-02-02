define([
    "jquery",
    "underscore",
    "backbone",
    "localStorage",
    "text!templates/cancel.html",
    "text!templates/cancel-item.html"
], function ($, _, Backbone, LocalStorage, CancelTemplate, ItemTemplate) {
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

        localStorage: new LocalStorage("snail-cancel"),

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
            //
            chrome.extension.getBackgroundPage().reload();

            return false;
        },

        recommend: function() {
            return false;
        }

    });

    var CancelView = Backbone.View.extend({

        el: "#content",

        template: _.template(CancelTemplate),

        events: {
            "valid.fndtn.abide form" : "addTentacle"
        },

        initialize: function() {
            
            this.listenTo(Tentacles, 'add', this.addOne);
            //this.listenTo(Tentacles, 'reset', this.addAll);
            //this.listenTo(Tentacles, 'all', this.render);

        },

        render: function() {
            this.$el.html(this.template());

            this.scheme = $("#scheme");
            this.url = $("#url");
            this.desc = $("#desc");

            if (Tentacles.length) {
                this.addAll();
            }else {
                console.log("Tentacles fetch");
                Tentacles.fetch();
            }
            //this.addAll();
            console.log("go here");
        },

        addOne: function(todo) {
            console.log("go addOne");
            var view = new TentacleView({model: todo});
            this.$("#cancel-list").append(view.render().el);
        },

        addAll: function() {
            console.log("go addAll");
            Tentacles.each(this.addOne, this);
        },

        addTentacle: function(event) {
            
            var scheme = this.scheme.val();
            var url = this.url.val();
            var desc = this.desc.val();

            console.log("scheme:"+scheme+",url:"+url+",desc:"+desc);

            if (scheme ==="" || url === "" || desc === "") {
                return;
            }
            url = scheme+url;

            Tentacles.create({url: url, desc: desc});

            chrome.extension.getBackgroundPage().reload();
        }

    });

    return CancelView;
    /*
    var view = Backbone.View.extend({
        el: "#content",

        template: _.template(CancelTemplate),

        render: function() {
            this.$el.html(this.template({}));
        }

    });

    return view;
    */
});


