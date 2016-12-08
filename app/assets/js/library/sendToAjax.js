function sendToAjax(eventType, content, callback) {
	callback = callback ? callback : function() {}

	$.ajax({
			url: '',
			type: 'post',
			data: {
				eventType: eventType,
				content: content,
				google_auth_key: googleImNotRobot
			},
		})
		.always(function(res) {
			callback(res);
		});
}