$(function () {
	chrome.runtime.onMessage.addListener(receiver);
	// var server = 'http://40.117.123.41:3000';
	var server = "https://65feb62a.ngrok.io";

	// Checking Unicode Value
	function isBanglaWord(word) {
		for (var index = 0; index < word.length; index++) {
			var val = word.charCodeAt(index);
			if (val > 2559 || val < 2458) {
				return false;
			}
		}
		return true;
	}


	function receiver(request, sender, sendResponse) {
		if (request.message === "user clicked!") {
			var textContent = document.body.innerText;
			var splittedWords = textContent.split(/[ \t\n,!'"`’;।:={}\[\]\\\^\$\.\|\?\*\+\(\)১২৩৪৫৬৭৮৯০]/);

			var shapedWords = new Set();

			for (word of splittedWords) {
				word = word.trim();
				if (isBanglaWord(word) && word) {
					shapedWords.add(word);
				}
			}

			var uniqueWords = [...shapedWords];
			console.log(uniqueWords);

			for (word of uniqueWords) {
				let data = {
					"word": word
				};

				$.ajax({
					url: server + '/api/words',
					type: 'POST',
					contentType: 'application/json; charset=utf-8',
					data: JSON.stringify(data),
					success: function (data, textStatus, jQxhr) {
						console.log("Upload Successful");
					},
					error: function (jqXhr, textStatus, errorThrown) {
						console.log("Upload Failed");
					}
				});

			}

		}
	}
})