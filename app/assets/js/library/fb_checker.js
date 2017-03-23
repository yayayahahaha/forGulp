function allready(init) {
    if (!init) {return "please input allready function as parameter"};
    var aCounterWhoCountForDocumentReady = 0;
    function allreadyCallback() {
        aCounterWhoCountForDocumentReady++;
        if (aCounterWhoCountForDocumentReady == 2) {
            init();
        }
    }
    var aIntervalWhoUseToDetectDocumentReadyOrNot = setInterval(function() {
        if (document.readyState !== "complete" || document.readyState !== "interactive") {
            clearInterval(aIntervalWhoUseToDetectDocumentReadyOrNot);
            allreadyCallback();
        }
    },200);

    var aIntervalWhoUseToDetectFBExistOrNot = setInterval(function() {
        if (FB) {
            clearInterval(aIntervalWhoUseToDetectFBExistOrNot);
            allreadyCallback();
        }
    },200);
}

function domready(cssLike, success, timeGap, times) {
    if (!cssLike) {
        return "please unique css-like selector as parameter";
    }
    success = success ? success : function(o) {console.log(o);}
    timeGap = timeGap ? timeGap : 50;
    times = times ? times : 100;

    var aCounterWhoCountTimesOfTesting = 0;
    var aIntervalWhoUseToDetectDOMExistOrNot = setInterval(function() {
        if (document.querySelector(cssLike)) {
            clearInterval(aIntervalWhoUseToDetectDOMExistOrNot);
            if (document.querySelectorAll(cssLike).length == 1) {
                success(document.querySelector(cssLike));
            } else {
                success(document.querySelectorAll(cssLike));
            }
        } else {
            aCounterWhoCountTimesOfTesting++;
            if (aCounterWhoCountTimesOfTesting == times) {
                clearInterval(aIntervalWhoUseToDetectDOMExistOrNot);
                console.error("timeout, fail to get DOM");
                success(null);
            }
        }
    }, timeGap);
}

function statusFB(success, always) {
    success = success ? success : function() {};
    always = always ? always : function() {};

    var aIntervalWhoUseToDetectFBExistOrNot = setInterval(function() {
        if (FB) {
            clearInterval(aIntervalWhoUseToDetectFBExistOrNot);
            FB.getLoginStatus(function(resL) {
                resL.status === "connected" 
                ? success(FB.getUserID(), FB.getAccessToken()) 
                : resL.status === "not_authorized" 
                    ? success(FB.getUserID(), null) 
                    : success(null, null);
            });
            always();
        }
    }, 200);
}

function loginFB(success, fail, always) {
    success = success ? success : function() {};
    fail = fail ? fail : function() {};
    always = always ? always : function() {};

    var aIntervalWhoUseToDetectFBExistOrNot = setInterval(function() {
        if (FB) {
            clearInterval(aIntervalWhoUseToDetectFBExistOrNot);
            if (!FB.getUserID()) {
                FB.login(function(resL) {
                    resL.status === 'connected' 
                    ? FB.api('/me', function(res) {
                        res.id 
                        ? success(res, resL) 
                        : fail(res, resL);
                    }) 
                    : fail(resL);
                });
            } else {
                if (!FB.getAccessToken()) {
                    FB.getLoginStatus(function(resL) {
                        resL.status === 'connected' 
                        ? FB.api('/me', function(res) {
                            res.id 
                            ? success(res, resL) 
                            : fail(res, resL);
                        }) 
                        : FB.login(function(resL) {
                            resL.status === 'connected' 
                            ? FB.api('/me', function(res) {
                                res.id 
                                ? success(res, resL) 
                                : fail(res, resL);
                            }) 
                            : fail(resL);
                        });
                    });
                } else {
                    FB.api("/me", function(res) {
                        res.id 
                        ? success(res) 
                        : fail(res);
                    })
                }
            }
        }
    }, 200);
    always();
}