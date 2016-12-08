function isMobile(width) {
	width = width ? width : null;
	if (width) {
		if (window.innerWidth > width) {
			return false;
		} else {
			return true;
		}
	}

	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		return true;
	} else {
		return false;
	}
}

var versions = function() {
	var u = navigator.userAgent,
		app = navigator.appVersion;
	var ua = navigator.userAgent.toLowerCase();

	return { //偵測移動端瀏覽器版本信息
		trident: u.indexOf('Trident') > -1, //IE 核心
		presto: u.indexOf('Presto') > -1, //opera 核心
		webKit: u.indexOf('AppleWebKit') > -1, //Apple, google 核心
		gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //Firefox 核心
		mobile: !!u.match(/AppleWebKit.*Mobile.*/), //行動裝置
		ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios
		android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android或uc瀏覽器
		iPhone: u.indexOf('iPhone') > -1, //是否為iPhone或者QQHD瀏覽器
		iPad: u.indexOf('iPad') > -1, //是否iPad
		webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
		iosv: u.substr(u.indexOf('iPhone OS') + 9, 3), //ios版本
		weixin: ua.match(/MicroMessenger/i) == "micromessenger", //微信瀏覽器
		fbapp: u.indexOf('FBAV') > -1, //Facebook App內瀏覽器
		line: u.indexOf('Line') > -1 //Line內瀏覽器
	};
	/* https://gist.github.com/monkianer/c163651c86897d744f10 */
}();

function whichBrowser() {
	deviceFromWhichBrowserFunction = null;
	if (/iPhone/i.test(navigator.userAgent)) {
		deviceFromWhichBrowserFunction = "iphone";
	} else if (/Android/i.test(navigator.userAgent)) {
		deviceFromWhichBrowserFunction = "android";
	}
	deviceFromWhichBrowserFunction = deviceFromWhichBrowserFunction ? deviceFromWhichBrowserFunction : "web";

	if (navigator.userAgent.match("Firefox")) {
		return [deviceFromWhichBrowserFunction, "firefox"];
	} else if (navigator.userAgent.match("MSIE")) {
		return [deviceFromWhichBrowserFunction, "msie"];
	} else if (navigator.userAgent.match("Opera")) {
		return [deviceFromWhichBrowserFunction, "opera"];
	} else if (navigator.userAgent.match("Safari")) {
		return [deviceFromWhichBrowserFunction, "safari"];
	} else if (versions.line) {
		return [deviceFromWhichBrowserFunction, "line"];
	} else {
		return [deviceFromWhichBrowserFunction, "unknow"];
	}
}