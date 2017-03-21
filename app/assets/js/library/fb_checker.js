appIdString = 1590515954569893; //company
// appIdString = 1760402077549165; // my own

/* Facebook part? */
/*(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id));
	js = d.createElement(s);
	js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));*/

/*window.fbAsyncInit = function() {
	FB.init({
		appId: appIdString,
		cookie: true, 
		xfbml: true, 
		version: 'v2.5' 
	});
}*/

/* makeSureFB(successFunction, failFunction, alwaysFunctin); */
function makeSureFB(success, fail, always) {
	success = success ? success : function(){};
	fail = fail ? fail : function(){};
	always = always ? always : function(){};

	FB.getLoginStatus(function(resL) {
		resL.status==='connected'
		?FB.api('/me',function(res) {
			res.id
			?success(res, resL)
			:fail(res, resL);
		})
		:FB.login(function(resL) {
			resL.status==='connected'
			?FB.api('/me',function(res) {
				res.id
				?success(res, resL)
				:fail(res,resL);
			})
			:fail(res, resL);
		});
	});
	always();
}


function loginFB(success, fail, always) {
    success = success ? success : function() {};
    fail = fail ? fail : function() {};
    always = always ? always : function() {};

    if(!FB.getUserID()){
        FB.login(function(resL) {
            resL.status === 'connected' ? FB.api('/me', function(res) {
                res.id ? success(res, resL) : fail(res, resL);
            }) : fail(resL);
        });
    }else{
        FB.getLoginStatus(function(resL) {
            console.log(resL);
            if(!FB.getAccessToken()){
                FB.login(function(resL) {
                    resL.status === 'connected' ? FB.api('/me', function(res) {
                        res.id ? success(res, resL) : fail(res, resL);
                    }) : fail(resL);    
                });
            }else{
                FB.api("/me",function(res) {
                    res.id ? success(res, resL) : fail(res, resL);
                })
            }
        })
    }
    always();
}
