function readyDOMObjct(cssLike, success, timeGap, times) {
    if (!cssLike) {return "please unique css-like selector";}
    success = success ? success : function(o) { console.log(o); }
    timeGap = timeGap ? timeGap : 50;
    times = times ? times : 100;

    var aCounterWhoCountTimesOfTesting = 0;
    var aIntervalWhoUseToDetectDOMExistOrNot = setInterval(function() {
        if(document.querySelector(cssLike)){
            clearInterval(aIntervalWhoUseToDetectDOMExistOrNot);
             if (document.querySelectorAll(cssLike).length == 1 ){
                 success(document.querySelector(cssLike));
             }else{
                 success(document.querySelectorAll(cssLike));
             }
        }else{
            aCounterWhoCountTimesOfTesting++;
            if (aCounterWhoCountTimesOfTesting == times) {
                clearInterval(aIntervalWhoUseToDetectDOMExistOrNot);
                console.log("timeout, fail to get DOM");
                success(null);
            }
        }
    },timeGap);
}

function statusFB(success, justLogin, fail, always) {
    success = success ? success : function() {};
    justLogin = justLogin ? justLogin : function() {};
    fail = fail ? fail : function() {};
    always = always ? always : function() {};

    var aIntervalWhoUseToDetectFBExistOrNot =  setInterval(function() {
        if(FB){
            clearInterval(aIntervalWhoUseToDetectFBExistOrNot);
            FB.getLoginStatus(function(resL) {
               resL.status === "connected" 
               ? FB.api("/me", function(res) {
                   res.id
                   ? success(FB.getUserID(), res)
                   : fail(resL, res)
               })
               : resL.status === "not_authorized" 
                   ? justLogin(FB.getUserID()) 
                   : fail(resL.status);
            });
            always();
        }
    }, 200);
}

function loginFB(success, fail, always) {
    success = success ? success : function() {};
    fail = fail ? fail : function() {};
    always = always ? always : function() {};

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
    always();
}