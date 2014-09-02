config = {

    "cancel": {
        "target1": {urls:["*://220.167.100.204/*"]}   //filter
        /*"target2": {urls:["*://220.167.100.204/*"], types:["..."]},   //filter

        "target3": {
            "filter": {urls:["<all_urls>"]}; // (optional)
            "expr": function(details) {
                //...
                return {cancel: true};
            }
        }
        */
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
                    //{src: /www.google.[^\/]*/, dest: "wen.lu"},
                    {src: /ajax.googleapis.com/, dest: "cdnjs.cloudflare.com", SCP: true}
            ]
        }
        //...
    }

};




