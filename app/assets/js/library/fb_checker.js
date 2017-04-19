/* jshint expr : true */

/* make sure FB Object is initialed and Document content is loaded */
function allready(init) {
    /* if user didn't pass any parameter or parameter type is not function, return */
    if (!init || typeof init !== "function") {
        console.log("please input allready function as parameter");
        return null;
    } else if (!window.fbAsyncInit) {
        console.log("please initial FB object");
        return null;
    }

    var aCounterWhoCountForDocumentReady = 0;

    /* if Document content is loaded and FB Object is initialed, this function will be trigger */
    function allreadyCallback() {
        aCounterWhoCountForDocumentReady++;
        if (aCounterWhoCountForDocumentReady == 2) {
            init();
        }
    }
    /* Check Document content is loaded or not */
    var aIntervalWhoUseToDetectDocumentReadyOrNot = setInterval(function() {
        if (document.readyState !== "complete" || document.readyState !== "interactive") {
            clearInterval(aIntervalWhoUseToDetectDocumentReadyOrNot);
            allreadyCallback();
        }
    }, 200);

    /* Check FB Object is initialed or not */
    var aIntervalWhoUseToDetectFBExistOrNot = setInterval(function() {
        try {
            if (FB) {
                clearInterval(aIntervalWhoUseToDetectFBExistOrNot);
                allreadyCallback();
            }
        } catch (e) {}
    }, 200);
}

/* make sure the DOM Object we use is perfectly exist and loaded */
function domready(cssLike, success, timeGap, times) {
    if (!cssLike) {
        return "please unique css-like selector as parameter";
    }
    success = success ? success : function(o) {
        console.log(o);
    };
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

/* check user FB login Status, but don't ask them login */
function statusFB(success, always) {
    if (!fbAsyncInitChecker()) {
        console.info("you didn't have window.fbAsync callback function");
        return;
    }
    success = success ? success : function() {};
    always = always ? always : function() {};

    var aIntervalWhoUseToDetectFBExistOrNot = setInterval(function() {
        try {
            if (FB) {
                clearInterval(aIntervalWhoUseToDetectFBExistOrNot);
                FB.getLoginStatus(function(resL) {
                    resL.status === "connected" ?
                        success(FB.getUserID(), FB.getAccessToken()) : resL.status === "not_authorized" ?
                        success(FB.getUserID(), null) : success(null, null);
                });
                always();
            }
        } catch (e) {}
    }, 200);
}

/* check user FB login status, and ask them login */
function loginFB(success, fail, always) {
    if (!fbAsyncInitChecker()) {
        console.info("you didn't have window.fbAsync callback function");
        return;
    }
    success = success ? success : function() {};
    fail = fail ? fail : function() {};
    always = always ? always : function() {};

    try {
        if (FB) {
            if (!FB.getUserID()) {
                FB.login(function(resL) {
                    resL.status === 'connected' ?
                        FB.api('/me', function(res) {
                            res.id ?
                                success(res, resL) : fail(res, resL);
                        }) : fail(resL);
                });
            } else {
                if (!FB.getAccessToken()) {
                    FB.getLoginStatus(function(resL) {
                        resL.status === 'connected' ?
                            FB.api('/me', function(res) {
                                res.id ?
                                    success(res, resL) : fail(res, resL);
                            }) : FB.login(function(resL) {
                                resL.status === 'connected' ?
                                    FB.api('/me', function(res) {
                                        res.id ?
                                            success(res, resL) : fail(res, resL);
                                    }) : fail(resL);
                            });
                    });
                } else {
                    FB.api("/me", function(res) {
                        res.id ?
                            success(res) : fail(res);
                    });
                }
            }
        }
    } catch (e) {
        console.info("FB object hasn't ready!");
    }

    always();
}

function fbAsyncInitChecker() {
    if (!window.fbAsyncInit) {
        return false;
    }
    return true;
}