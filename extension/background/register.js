var register = function(config) {
    "use strict";

    var snail = engine();

    snail.parse(config);

    snail.on();

}; 

register(config);

