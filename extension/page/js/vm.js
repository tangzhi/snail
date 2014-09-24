define([], function(){ 
    "use strict";

    var views = {};
    window.views = views;

	var create = function (name, View) {

		if(typeof views[name] !== "undefined") {
		    return views[name];
		}

		var view = new View();
		views[name] = view;

		return view;
	};
	
    return {create: create};
});
