window.onload = function() {
	console.log("check out comments!");
}
/*
	fb_checker
	makeSureFB(successFunction, failFunction, alwaysFunctin);

	toggle_input
	toggleInput(domObject or domObjectArray, colorAfterClick, colorBeforeClock);

	formChecker({},{},...{});
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
*/