config = {

    /*
    "cancel": {
        "target1": {urls:["*://220.167.100.204/*", "http://uedas.qidian.com/javascript/statlib.js", "*://*.game.qidian.com/*", "*://*.tbc37.net/*", "*://*.jntmedia.cn/*", "*://*.mediav.com/*", "*://*.allyes.com/*", "*://www.qidian.com/ploy/*"]}   //filter
        //"target2": {urls:["*://220.167.100.204/*"], types:["..."]},   //filter

        //"target3": {
        //    "filter": {urls:["<all_urls>"]}, // (optional)
        //    "expr": function(details) {
                //...
        //        return {cancel: true};
        //    }
        //}
        //...
    },
    
    "redirectUrl": {
        "target1": {
            "filter": {urls:["*://fonts.googleapis.com/*", "*://*.blogspot.com/*"]}, // (optional)
            "replace": {
                    "fonts.useso.com": /fonts.googleapis.com/,
                    "blogsp0t.com": /blogspot.com/
            }
        },
        "target2": {
            "filter": {urls:["*://ajax.googleapis.com/*", "*://www.google.com/*", "*://www.google.com.hk/*"]}, // (optional)
            "replace": [
                    {src: /ajax.googleapis.com/, dest: "cdnjs.cloudflare.com", SCP: true}
            ]
        }
        //...
    } ,

    "onAuthRequired": {
        "home.asiainfo": {
            "login": {
                "filter": {urls:["*://*.asiainfo.com/*"]},
                "extraInfo": ["asyncBlocking"],
                "handle": function(details, callbackFn) {
                    console.log("auth:"+details.url);
                    console.log("details"+JSON.stringify(details));

                    var lastTime = localStorage[details.url+":"+"2"];

                    var diffTime = function(lastTime) { 
                        var curTime = new Date().getTime();
                        return (curTime - lastTime)/1000;
                    };

                    if (!lastTime || diffTime(lastTime) > 60*3) {

                        localStorage[details.url+":"+"2"] = new Date().getTime();

                        callbackFn({
                            authCredentials: {username: "ai\\tangzhi", password: "!!!!!!a1"}
                        });

                    }else{
                        callbackFn({});
                    }
                }

            }
        }
    },
    */

    //查询结果，新页面打开
    "onBeforeRequest": {
        "google.query" : {
            "newwindow": {
                "filter": {urls:["*://www.google.com/*","*://www.google.com.hk/*", "*://g.cncoder.cn/*", "*://g.ttlsa.com/*"],
                             types:["main_frame", "xmlhttprequest"]},
                "handle": function(details) {
                    //
                    if (-1 == details.url.indexOf("newwindow=1") && 
                            (   details.url.indexOf("#q=")>0 || details.url.indexOf("?q=")>0 || details.url.indexOf("\&q=")>0 )) {
                        return {redirectUrl: details.url+"&newwindow=1"};
                    }
                }
            }
        }
    },

    //查询结果直达最终结果页，不经过google跳转
    "onCompleted": {
        "google.query" : {
            "directResult" : {
                "filter": {urls:["*://www.google.com/*","*://www.google.com.hk/*", "*://g.cncoder.cn/*", "*://g.ttlsa.com/*"]},
                "handle": function(details) {
                    var change = function() {
                        var arr = window.document.getElementsByTagName("a");
                        for(var el,i=0,j=arr.length; i<j; i++) {
                            el = arr[i];
                            if (el.hasAttribute("href") && 
                                    el.hasAttribute("onmousedown") && 
                                    el.getAttribute("onmousedown") != "return true") {
                                el.setAttribute("onmousedown", "return true");
                                clone = document.importNode(el, true);//remove original onmousedown event
                                var p = el.parentNode; 
                                p.removeChild(el);
                                p.appendChild(clone);
                            }
                        }
                    };

                    if (details.type == "main_frame" || 
                            details.type == "sub_frame" ||
                            details.type == "xmlhttprequest") {
                                    chrome.tabs.executeScript(details.tabId, {code: "("+change.toString() + ")()"});
                    }
                }

            }
        } 
    }
};




