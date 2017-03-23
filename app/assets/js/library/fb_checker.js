function statusFB(success, fail, always) {
    success = success ? success : function() {};
    fail = fail ? fail : function() {};
    always = always ? always : function() {};

    var aIntervalWhoUseToDetectFBExistOrNot =  setTimeout(function() {
        if(FB){
            clearInterval(aIntervalWhoUseToDetectFBExistOrNot);
            FB.getLoginStatus(function(res) {
               res.status === "connected" ? success(res.status) : fail(res.status) ;
            });
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