/* jshint indent:4 */
var REQUEST_EVENTS = ["onBeforeRequest", 
                   "onBeforeSendHeaders",
                   "onSendHeaders",
                   "onHeadersReceived",
                   "onAuthRequired",
                   "onBeforeRedirect",
                   "onResponseStarted",
                   "onCompleted",
                   "onErrorOccurred"
                   ];

var OPTS_FILTER_IDENTIFIER = "filter";
var OPTS_EXTRA_INFO_IDENTIFIER = "extraInfo";

var DEFAULT_EXTRA_INFO_OPTS = {};

//init data
(function(){
    "use strict";

    //onAuthRequired need ???asyncBlocking???
    _.each(["onBeforeRequest", "onBeforeSendHeaders", "onHeadersReceived", "onAuthRequired"], function(ev) {
        DEFAULT_EXTRA_INFO_OPTS[ev] = ["blocking"];
    });
    
    DEFAULT_EXTRA_INFO_OPTS.onBeforeSendHeaders.push("requestHeaders");
    DEFAULT_EXTRA_INFO_OPTS.onHeadersReceived.push("responseHeaders");

})();

/* exported engine */
var engine = function() {
    "use strict";

    //records callback list
    var gRules;

    //convert config to options
    var parse = function(config) {

        var cfg = {};

        for(var action in config) {
            if (_.include(["cancel", "redirectUrl"], action)) {
                cfg.onBeforeRequest = cfg.onBeforeRequest || {};
                cfg.onBeforeRequest[action] = config[action];
            }

            if (_.include(REQUEST_EVENTS, action)) {
                cfg[action] = cfg[action] || {};
                _.extend(cfg[action], config[action]);
            }
        }

        getRules(cfg);
    };

    //get filter option or extraInfo option by eventName
    var getOpt = function(option, eventName, type) {

        //get default extraInfo options
        if (option === void 0 && type === OPTS_EXTRA_INFO_IDENTIFIER) {
            option = DEFAULT_EXTRA_INFO_OPTS[eventName];
        }

        if (option === void 0 && type === OPTS_FILTER_IDENTIFIER) {
            option = {urls:["<all_urls>"]};
        } 

        return _.isFunction(option) ? option() : option;
    };

    var handles = {
        cancelHandle: function(details){
            console.log("cancel url:"+details.url);
            return {cancel:true};
        },
        
        redirectHandle: function(info) {
            var redirects = info;
            if (!_.isArray(info)) {
                redirects = [];
                for(var dest in info) {
                    var obj = {src: info[dest], dest: dest};
                    redirects.push(obj);
                }
            }
            //console.log("redirects:"+JSON.stringify(redirects));

            return function(details) {
                var newUrl = details.url;
                for(var i = 0, j = redirects.length; i<j; ++i) {
                    console.log("replace rule.  src:"+redirects[i].src + ", dest:"+redirects[i].dest);
                    newUrl = newUrl.replace(redirects[i].src,redirects[i].dest); 
                }
                if (newUrl !== details.url) {
                    console.log("old_url:"+details.url);
                    console.log("new_url:"+newUrl);
                    return {redirectUrl: newUrl};
                }
            };
        }

    };

    //
    var getRules = function(options) {

        gRules = {};
        var handle;
        
        for(var ev in options) {

            if (!_.include(REQUEST_EVENTS, ev)) {
                continue;
            }

            var option = options[ev]; 
            gRules[ev] = gRules[ev] || {};
            
            for(var action in option) {
                var targets = option[action];

                for(var target in targets) {
                    var cmd = targets[target];

                    if (action === "cancel") {
                        handle = cmd.expr || handles.cancelHandle;
                        gRules[ev][action+"."+target] = {   handle:handle, 
                                                            filter: (cmd.expr ? cmd.filter : cmd), 
                                                            extraInfo: cmd.extraInfo    };
                        continue;
                    }

                    if (action === "redirectUrl") {
                        handle = handles.redirectHandle(cmd.replace);
                        gRules[ev][action+"."+target] = {   handle:handle, 
                                                            filter: cmd.filter,
                                                            extraInfo: cmd.extraInfo };
                        continue;
                    }

                }

            }
        }
        
    };
    
    var on = function() {

        if (!gRules) {
            return;
        }

        console.log(JSON.stringify(gRules));

        for(var ev in gRules) {
            var targets = gRules[ev];

            for(var target in targets) {
                var cmd = targets[target];
                
                console.log("on:["+ev+"]-"+target);
                chrome.webRequest[ev].addListener(  cmd.handle, 
                                                    getOpt(cmd.filter, ev, OPTS_FILTER_IDENTIFIER),
                                                    getOpt(cmd.extraInfo, ev, OPTS_EXTRA_INFO_IDENTIFIER) );
            }
        }

    };

    var off = function() {

        if (!gRules) {
            return;
        }

        for(var ev in gRules) {
            var targets = gRules[ev];

            for(var target in targets) {
                var cmd = targets[target];
                    
                chrome.webRequest[ev].removeListener( cmd.handle );        
            }
        }

    };

    return {
        parse: parse,
        on : on,
        off: off
    };
};

