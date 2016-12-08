/*
	stringBytes(string);
*/
function stringBytes(c) {
	var n = c.length,
		s;
	var len = 0;
	for (var i = 0; i < n; i++) {
		s = c.charCodeAt(i);
		while (s > 0) {
			len++;
			s = s >> 8;
		}
	}
	return len;
	/*http://www.puritys.me/docs-blog/article-107-String-Length-%E4%B8%AD%E6%96%87%E5%AD%97%E4%B8%B2%E9%95%B7%E5%BA%A6.html*/
}

/* 
	text and textarea only 
	toggleInput(domObject or domObjectArray, colorAfterClick, colorBeforeClock);
*/
function toggleInput(input, colorAfter, colorBefoe) {
	colorBefoe = colorBefoe ? colorBefoe : input.style.color;
	colorAfter = colorAfter ? colorAfter : input.style.color;
	if (input.length) {
		for (var i = 0; i < input.length; i++) {
			toggleInputInnerFunction(input[i]);
		}
	} else {
		toggleInputInnerFunction(input);
	}

	function toggleInputInnerFunction(o) {
		o.onfocus = function() {
			o.style.color = colorAfter;
			if (o.value == o.defaultValue) {
				o.value = "";
			} else {
				o.select();
			}
		}
		o.onblur = function() {
			if (o.value == "") {
				o.value = o.defaultValue;
				o.style.color = colorBefoe;
			}
		}
	}
}

/* 
	formChecker({},{},...{});
	會回傳一個String 的form表單確認表
	回傳空值代表沒有錯誤，其餘為顯示錯誤訊息
	可用 text, textarea, select, email, phone, radio, checkbox
	text 或textarea 若以共用class 的形式一口氣設定全部的錯誤訊，只能設定單一錯誤訊息，但仍會判斷email 或手機
	若要顯示不同的錯誤訊息建議個別傳入每個text 的獨立css-like 選擇器
	checkbox 和 radio 可以以共用class 的方式一口氣設定全部的錯誤訊息

	query 的值放的是css-like 的選擇器  (ex: .class, #id, tag, [name=myName]...etc)
	errorText 為錯誤時會顯示的錯誤訊息，建議在後面依需求加上 \n 或是 <br>
	checkboxEmpty 是專門給checkbox設定的屬性，用來判斷checkbox可否為空值
	wrongEmail 回傳如果email 格式錯誤時會回傳的訊息，預設為"email 格式錯誤\n"
	wrongPhone 回傳如果手機格式錯誤時會回傳的訊息，預設為"手機格式判斷錯誤\n"
	elseRule 用於需要做額外判斷時宣告的一個function, 一樣回傳字串

	email 不需寫額外的判斷式，但透過此css-like 選擇器選出的物件的name 或type 必須為email
	phone 不需寫額外的判斷式，但透過此css-like 選擇器選出的物件的name 必須為phone

*/
var inputObjectExample = {
	"query": ".input1", //要確認的欄位，用css-like的選擇器決定，checkbox 或radio 可以加上共同class 再一起選
	"errorText": "如果是空的的話會顯示的錯誤訊息\n", //預設為"errorText: 沒有設定錯誤訊息\n", 建議在後面加上換行符號，依用途改為 \n 或 <br>
	"checkboxEmpty": false, //用來確認此checkbox 可否全部不選, true 是可以全部不選, false是起碼要選1 個, 沒寫的話預設是false
	"wrongEmail":"如果email格式錯誤會回傳的訊息", //預設為"email 格式錯誤\n"
	"wrongPhone":"如果phone格式錯誤會回傳的訊息", //預設為"手機格式錯誤\n"
	"elseRule": function(o) { //此function 用來做空值的以外的判斷，回傳一個字串, 參數o 為該form 的dom 物件實體
		return "回傳一個額外判斷的錯誤\n";
	}
};

function formChecker() {
	var objects = arguments,
		errorText = "";

	for (var i = 0; i < objects.length; i++) {
		o = document.querySelectorAll(objects[i].query);
		objects[i].errorText = objects[i].errorText ? objects[i].errorText : "errorText: 沒有設定錯誤訊息\n";
		objects[i].elseRule = objects[i].elseRule ? objects[i].elseRule : emptyFunction;
		objects[i].checkboxEmpty = objects[i].checkboxEmpty ? objects[i].checkboxEmpty : false;

		o.length === 1 ? singleObject(o, objects[i]) : multiObject(o, objects[i])
	}
	return errorText;

	function singleObject(oDom, oInput) {
		oDom = oDom[0];

		if (oDom.tagName.toLowerCase() === 'input' && oDom.getAttribute('type') === 'text' || oDom.getAttribute('type') === 'email') {
			if (oDom.value === oDom.defaultValue) {
				errorText += oInput.errorText;
			} else {
				// 檢查email
				if (oDom.getAttribute('name') === 'email' || oDom.getAttribute('type') === 'email') {
					var emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
					oInput.wrongEmail = oInput.wrongEmail ? oInput.wrongEmail : "email格式錯誤\n";
					if (oDom.value.search(emailRule) == -1) {
						errorText += oInput.wrongEmail;
					}
				}
				// 檢查手機
				if (oDom.getAttribute('name') === 'phone') {
					var phoneRule = /^09[0-9]{8}$/;
					oInput.wrongPhone = oInput.wrongPhone ? oInput.wrongPhone : "手機格式錯誤\n";
					if (oDom.value.search(phoneRule) == -1) {
						errorText += oInput.wrongPhone;
					}
				}
			}
		} else if (oDom.tagName.toLowerCase() === 'select') {
			if (oDom.value === 'default') {
				errorText += oInput.errorText;
			}
		} else if (oDom.tagName.toLowerCase() === 'textarea') {
			if (oDom.value === oDom.defaultValue) {
				errorText += oInput.errorText;
			}
		} else if (oDom.getAttribute('type') === 'checkbox') {
			if (!oInput.checkboxEmpty) {
				if (oDom.checked === false) {
					errorText += oInput.errorText;
				}
			}
		}
		errorText += oInput.elseRule(oDom);
	}

	function multiObject(oDom, oInput) {
		if (oDom[0].getAttribute('type') === 'checkbox') {
			if (!oInput.checkboxEmpty) {
				checkboxChecker = false;
				for (var i = 0; i < oDom.length; i++) {
					if (oDom[i].checked === true) {
						checkboxChecker = true;
						break;
					}
				}
				if (!checkboxChecker) {
					errorText += oInput.errorText;
				}
			}
		} else if (oDom[0].getAttribute('type') === 'radio') {
			radioChecker = false;
			for (var i = 0; i < oDom.length; i++) {
				if (oDom[i].checked === true) {
					radioChecker = true;
					break;
				}
			}
			if (!radioChecker) {
				errorText += oInput.errorText;
			}
		} else if (oDom[0].getAttribute('type') === 'text') {
			multiTextChecker = false;
			for (var i = 0; i < oDom.length; i++) {
				if (oDom[i].value === oDom[i].defaultValue) {
					multiTextChecker = true;
				} else {
					if (oDom[i].getAttribute('type') === 'email' || oDom[i].getAttribute('name') === 'email' || oDom[i].getAttribute('name') === 'phone') {
						singleObject([oDom[i]], oInput);
					}
				}
			}
			if (multiTextChecker) {
				errorText += oInput.errorText;
			}
		}
		errorText += oInput.elseRule(oDom);
	}
}

function emptyFunction() {
	return "";
}

