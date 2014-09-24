define([
    "jquery",
    "underscore",
    "backbone"
], function ($, _, Backbone) {
    "use strict";

    var view = Backbone.View.extend({
        el: "#content",

        template: _.template($('#cancel-template').html()),

        render: function() {
            console.log("cancelView render.");
            $(".fi-x").parents("li").addClass("active")
                      .siblings().removeClass("active");
            this.$el.html(this.template({}));
        }

    });

    return view;
});


