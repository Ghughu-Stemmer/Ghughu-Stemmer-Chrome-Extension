$(function () {
	chrome.runtime.onMessage.addListener(receiver);
	var server = "https://www.connectapp.ml";

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

	var uploadedWords = [];
	var intervals = [];

	function getCallback(w) {
		console.log(`callback for ${w}`);
		let myWord = w;
		var func = function (data, textStatus, jQxhr) {
			console.log(`Upload Successful`);
			uploadedWords.push(myWord);
			console.log(myWord);
		}
		return func;
	}

	function run() {
		console.log(`Uploaded Words: ${uploadedWords}`);
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
			if (uploadedWords.includes(word)) continue;

			let data = {
				"word": word
			};

			$.ajax({
				url: server + '/api/words/insertWord',
				type: 'POST',
				contentType: 'application/json; charset=utf-8',
				data: JSON.stringify(data),
				success: getCallback(word),
				error: function (jqXhr, textStatus, errorThrown) {
					console.log("Upload Failed");
				}
			});

		}
	}


	function receiver(request, sender, sendResponse) {
		if (request.message === "user clicked!") {
			console.log("clicked");
			run();
		}
	}

	let interval = setInterval(run, 5000);
	intervals.push(interval);
})
