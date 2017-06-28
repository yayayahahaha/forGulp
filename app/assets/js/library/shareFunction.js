/* 分享後要做什麼事寫在這裡，帶有facebook 的response, */
function afterShare(res) {}

/* 不管分享function 有沒執行完畢，只要點擊就會執行的function 放這裡 */
function alwaysDo() {}

/* 臉書的js 引入片段, 一個網站以僅一次為佳 */
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s);
	js.id = id;
	// js.src = "//connect.facebook.net/en_US/sdk.js";
	js.src = "//connect.facebook.net/en_US/all.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/* 這段是確認整個文本載入這個js 以前有沒有宣告過window.fbAsyncInit
	如果有的話會先執行
	因此，在此js 檔之後載入的js 不建議再次宣告window.fbAsyncInit
	以直接確認FB 實體是否存在的方式為佳 */
var otherFbInit = null;
if (window.fbAsyncInit) {
	var otherFbInit = window.fbAsyncInit;
}
window.fbAsyncInit = function() {
	/* 判斷是否有宣告過fbAsyncInit */
	if (otherFbInit) {
		otherFbInit();
	}
	/* 判斷是否有宣告過fbAsyncInit 結束  */

	/* FB 物件實體的宣告 */
	FB.init({
		appId: '1590515954569893',
		cookie: true,
		xfbml: true,
		version: 'v2.8'
	});

	/* 檢查整份document 載入完畢與否的function */
	var timmer = setInterval(function() {

		/* 載入完畢後取消interval */
		if (document.readyState === "complete") {
			clearInterval(timmer);

			/* 判定點擊開始 */
			document.addEventListener("click", function(e) {
				/* 被點擊到的物件有 .share-fb 或 .share-line 的類別名稱 */

				if (e.target.className.search("share-fb") !== -1) {

					/* 執行alwaysDo() */
					alwaysDo();

					/* 抓取meta 裡的og 系列 */
					var shareData = {
						title: document.querySelector("meta[property='og:title']") && document.querySelector("meta[property='og:title']").content ?
							document.querySelector("meta[property='og:title']").content : document.querySelector("title") && document.querySelector("title").innerHTML ?
							document.querySelector("title").innerHTML : "",
						description: document.querySelector("meta[property='og:description']") && document.querySelector("meta[property='og:description']").content ?
							document.querySelector("meta[property='og:description']").content : "",
						site_name: document.querySelector("meta[property='og:site_name']") && document.querySelector("meta[property='og:site_name']").content ?
							document.querySelector("meta[property='og:site_name']").content : "",
						type: document.querySelector("meta[property='og:type']") && document.querySelector("meta[property='og:type']").content ?
							document.querySelector("meta[property='og:type']").content : "website",
						url: document.querySelector("meta[property='og:url']") && document.querySelector("meta[property='og:url']").content ?
							document.querySelector("meta[property='og:url']").content : window.location.href,
						image: document.querySelector("meta[property='og:image']") && document.querySelector("meta[property='og:image']").content ?
							document.querySelector("meta[property='og:image']").content : ""
					};

					/* 如果分享圖片為空的話，抓取第一張圖片的src */
					if (!shareData.image) {
						images = document.querySelectorAll("img");
						if (parseInt(images.length) !== 0) {
							shareData.image = images[0].src;
						}
					}

					/* 分享 */
					FB.ui({
							method: 'share',
							href: shareData.url,
							title: shareData.title,
							picture: shareData.image,
							description: shareData.description,
							mobile_iframe: deviceChecker() === "mobile" ? true : false
						},
						function(res) {

							/* 呼叫afterShare() */
							afterShare(res);
						});
					shareData = null;
				} else if (e.target.className.search("share-line") !== -1) {
					window.open(
						"https://timeline.line.me/social-plugin/share?url=" +
						window.location.href
					);
				}
				hasShareClass = null;
			});
		}
	}, 100);
};

/* 判斷裝置用function */
function deviceChecker() {
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		return "mobile";
	} else {
		return "website";
	}
}

/* https://timeline.line.me/social-plugin/share?url= */