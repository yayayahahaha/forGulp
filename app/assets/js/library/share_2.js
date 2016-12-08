shareList = [
    '.share-twitter',
    // '.share-test'
]
shareFunctionList = {
    'twitter': shareTwitter,
    // 'test': shareFunctionTest
}
shareBtnList = []
for (var i = 0; i < shareList.length; i++) {
    shareBtnList.push(new Object());
}

var device = false;

function PopupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}

function shareDomClickEventInit() {
    for (var i = 0; i < shareList.length; i++) {
        shareBtnList[i] = document.querySelector(shareList[i]);
        if (shareBtnList[i]) {
            // console.log(shareBtnList[i].className.split('-')[1] + ' share works!');
            shareBtnList[i].onclick = function() {
                type = this.className.split('-')[1];
                shareText = document.querySelector('title').innerHTML;
                shareUrl = window.location;
                /* there's some problem of sharing link, so use same string of shareText for now */
                // shareText = shareUrl;
                /* if push on server could works, remove upper line */
                var shareLink = shareFunctionList[type](shareText, shareUrl, type);
                if (shareLink) {
                    if (!device) {
                        PopupCenter(shareLink, type, 500, 300);
                    } else {
                        PopupCenter(shareLink, type, window.innerWidth, window.innerHeight);
                    }
                }
            }
        }
    }
}

$(document).ready(function(argument) {
    shareDomClickEventInit();
});

function shareTwitter(shareText, shareUrl, type) {
    obj = document.querySelector('.share-twitter');
    twitterShareArray = [
        "https://twitter.com/intent/tweet",
        "?ref_src=", "twsrc%5Etfw",
        "&text=", encodeURIComponent(shareText),
        "&tw_p=", "tweetbutton",
        "&url=", encodeURIComponent(shareUrl)
    ]
    var twitterShareLink = twitterShareArray.join("");
    sendShareToFg(type);

    return twitterShareLink;
}

function shareFunctionTest() {
    // return "http://www.google.com.tw";
}

function sendShareToFg(type) {
    event = window.location.href.split('/')[5];

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        device = true;
    }

    ajaxInput = {
        "type": type,
        "event": event,
        "device": device ? "mobile" : "web"
    };
    console.log("尚未測試, 詳見share_2.js line: 92\n\t", ajaxInput);
    $.ajax({
        // url: "http://active.fashionguide.com.tw/new/ajax/share_log.php",
        url: "",
        dataType: "text",
        type: "POST",
        data: ajaxInput,
        success: function(e) {},
        error: function(e) {}
    });
}