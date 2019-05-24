$(function () {
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
		//console.log(`callback for ${w}`);
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

		var newWords = [];
		for (word of uniqueWords) {
			
			if (uploadedWords.includes(word)) continue;
			else newWords.push(word);

			if(newWords.length >= 200) break;
		}

		let data = {
			"words": JSON.stringify(newWords)
		};
		console.log("new words: ", JSON.stringify(newWords));

		$.ajax({
			url: server + '/api/words/insertWords',
			type: 'POST',
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify(data),
			success: function(data) {
				console.log("all words are uploaded");
				uploadedWords = [...uploadedWords, ...newWords];
			},
			error: function (jqXhr, textStatus, errorThrown) {
				console.log("Upload Failed");
			}
		});
	}

	let interval = setInterval(run, 5000);
	intervals.push(interval);
})
