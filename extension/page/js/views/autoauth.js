define([
    "jquery",
    "underscore",
    "backbone"
], function ($, _, Backbone) {
    "use strict";

    var view = Backbone.View.extend({
        el: "#content",

        template: _.template($('#autoauth-template').html()),

        render: function() {
            this.$el.html(this.template({}));
        }

    });

    return view;
});

