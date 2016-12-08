/* 藉由傳送 googleImNotRobot 來判斷使用者是不是機器人 */

googleRobotDetectSiteCode = "6LebHA4UAAAAADrcb7ybClL47mfzXV100qYNvlYX"; //my own
googleImNotRobot = null;

$(document).ready(function() {
	var checkIfThisPageNeedRobotDetector = document.querySelector('#google-auth-robot');
	if (checkIfThisPageNeedRobotDetector) {
		/* Google Robot Detect part */
		(function(d, s) {
			var js, fjs = d.getElementsByTagName(s)[0];
			js = d.createElement(s);
			js.src = "https://www.google.com/recaptcha/api.js?onload=googleImNotRobotOnload&render=explicit";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script'));
	}
});

function googleImNotRobotOnload() {
	grecaptcha.render('google-auth-robot', {
		'sitekey': googleRobotDetectSiteCode,
		'callback': afterGoogleAuthCallbackFunction,
		// 'theme': 'dark', //這行用來決定背景是黑是白
		// 'size' : "compact" //這行如果拿掉就會變成橫的
	});
}

function afterGoogleAuthCallbackFunction(res) {
	googleImNotRobot = res;
}