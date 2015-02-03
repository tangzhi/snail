
var snail = engine();

var register = function(config) {
    "use strict";

    snail.generateRules();

    //snail.parse(config);

    snail.on();

}; 

var reload = function() {
    snail.off();
    register(config);
};

register(config);

