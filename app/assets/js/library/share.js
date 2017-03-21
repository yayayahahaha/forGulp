/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var shareToFb = __webpack_require__(1);
	var shareToLine = __webpack_require__(2);
	var data = window.__SHARE__ || {};

	var shareModule = function shareModule() {
	  var $document = $(document);

	  var events = {
	    shareToFb: ['click', '.share-fb'],
	    shareToLine: ['click', '.share-line']
	  };

	  var eventMethod = {
	    shareToFb: shareToFb.shareInMobile,
	    shareToLine: shareToLine.share
	  };

	  var checkDevice = function checkDevice() {
	    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
	    );
	  };

	  var init = function init(data) {
	    if (!checkDevice()) {
	      shareToFb.init();
	      eventMethod.shareToFb = shareToFb.share;
	    }

	    Object.keys(events).forEach(function (key) {
	      $document.on(events[key][0], events[key][1], function () {
	        eventMethod[key](data);
	      });
	    });
	  };

	  return {
	    init: init
	  };
	}();

	shareModule.init(data);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var shareToFb = function shareToFb() {
	  var appId = 1590515954569893;
	  var init = function init() {
	    window.fbAsyncInit = function () {
	      FB.init({
	        appId: appId,
	        display: 'dialog',
	        status: true,
	        cookie: true,
	        xfbml: true,
	        oauth: true,
	        version: 'v2.5'
	      });
	      FB.Canvas.setAutoGrow();
	    };

	    (function FbSDK(d, s, id) {
	      var fjs = d.getElementsByTagName(s)[0];
	      var js = fjs;
	      if (d.getElementById(id)) {
	        return;
	      }
	      js = d.createElement(s);
	      js.id = id;
	      js.src = '//connect.facebook.net/zh_TW/sdk.js';
	      fjs.parentNode.insertBefore(js, fjs);
	    })(document, 'script', 'facebook-jssdk');
	  };

	  var getShareInfo = function getShareInfo(data) {
	    return {
	      link: data.url || $('meta[property="og:url"]').attr('content') || location.origin + location.pathname + location.search,
	      name: data.title || $('meta[property="og:title"]').attr('content') || 'Fashion Guide',
	      caption: data.author || $('meta[name="author"]').attr('content') || 'FashionGuide華人第一女性時尚美妝傳媒',
	      description: data.description || $('meta[property="og:description"]').attr('content') || 'FashionGuide華人第一女性時尚美妝傳媒',
	      picture: data.picture || $('meta[property="og:image"]').attr('content') || ''
	    };
	  };

	  var getLoginStatus = function getLoginStatus(shareInfo) {
	    FB.getLoginStatus(function (response) {
	      var uiInfo = {
	        display: 'popup',
	        method: 'feed'
	      };
	      uiInfo = Object.assign(uiInfo, shareInfo);

	      if (response.status === 'connected') {
	        FB.ui(uiInfo);
	      } else {
	        FB.login(function (response) {
	          if (response.status === 'connected') {
	            FB.ui(uiInfo);
	          }
	        });
	      }
	    });
	  };

	  var share = function share(data) {
	    var shareInfo = getShareInfo(data);
	    getLoginStatus(shareInfo);
	    return false;
	  };

	  var shareInMobile = function shareInMobile(data) {
	    var shareInfo = getShareInfo(data);
	    var mobileShare = ['http://m.facebook.com/dialog/feed?app_id=', appId, '&name=', encodeURIComponent(shareInfo.name), '&caption=', encodeURIComponent(shareInfo.caption), '&description=', encodeURIComponent(shareInfo.description), '&picture=', encodeURIComponent(shareInfo.picture), '&link=', encodeURIComponent(shareInfo.link), '&redirect_uri=', encodeURIComponent(shareInfo.link)];

	    location.href = mobileShare.join('');
	    return false;
	  };

	  return {
	    init: init,
	    share: share,
	    shareInMobile: shareInMobile
	  };
	}();

	module.exports = shareToFb;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var shareToLine = function shareToLine() {
	  var share = function share(data) {
	    var lineLink = data.url || $('meta[property="og:url"]').attr('content') || location.origin + location.pathname + location.search;
	    var lineCaption = data.title || $('meta[property="og:title"]').attr('content') || 'Fashion Guide';
	    var linkString = ['http://line.me/R/msg/text/?', lineCaption, '%0D%0A', encodeURI(lineLink)];
	    linkString = linkString.join('');
	    window.open(linkString);
	  };

	  return {
	    share: share
	  };
	}();

	module.exports = shareToLine;

/***/ }
/******/ ]);