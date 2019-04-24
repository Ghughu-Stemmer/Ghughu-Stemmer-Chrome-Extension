chrome.runtime.onMessage.addListener(receiver);


// Checking Unicode Value


function isBanglaWord(word) {

	for (var index = 0; index < word.length; index++) {
		var val = word.charCodeAt(index);

		if(val > 2559 || val < 2458) {
			return false;
		}
	}

	return true;


}

function getWithoutStopMark(word) {

	var stopMarks = ["!",",","’","?",";","।",":"];

	if(word.startsWith("‘")) {
		word = word.slice(1,);
	}

	for(ch of stopMarks) {
		if(word.endsWith(ch)){
			return word.slice(0,-1);
		}
	}

	return word;
}







function receiver(request, sender, sendResponse) {
	if (request.message === "user clicked!") {
		
	  	var textContent = document.body.innerText;
	  	var splittedWords = textContent.split(/[\t\n (){}]/);

	  	var shapedWord = new Set();
	  	

	  	for(word of splittedWords) {
	  		word = word.trim();

	  		if(isBanglaWord(word) && word) {
	  			shapedWord.add(getWithoutStopMark(word));
	  		}
	  	}
	  	console.log(shapedWord);
	}
}


// var textContent = document.body.innerText;
// var vervs = "";

// for(word of new Set(textContent.split(" "))) {
// 	if(word.endsWith("।")) {

// 		word = word.slice(0,-1);

// 		if (window.confirm(word)) {
// 			vervs+= word + " ";
// 		}
		
// 	}
// }

// console.log(vervs);


// console.log("hi,facebook");


// if( window.location.href === "https://www.facebook.com/") {
// 	if(window.confirm("Do you really want to Stay here?")) {

// 	} else{
// 		window.location.assign("https://www.google.com/");
// 	}
// }
