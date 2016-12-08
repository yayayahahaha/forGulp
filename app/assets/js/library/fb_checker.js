// appIdString = 1590515954569893; //company
appIdString = 1760402077549165; // my own

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

	FB.getLoginStatus(function(res) {
		res.status==='connected'
		?FB.api('/me',function(res) {
			res.id
			?success()
			:fail();
		})
		:FB.login(function(res) {
			res.status==='connected'
			?FB.api('/me',function(res) {
				res.id
				?success()
				:fail();
			})
			:fail();
		});
	});
	always();
}