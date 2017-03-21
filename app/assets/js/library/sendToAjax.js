console.log("why");

function calllll() {
	alterline
	console.log("hellooooo");
}

function sendToAjaxa(url, input, callback) {
	callback = callback ? callback : function() {}

	$.ajax({
			url: url,
			type: 'post',
			data: input,
		})
		.always(function(res) {
			callback(res);
		});
}