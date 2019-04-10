chrome.runtime.onMessage.addListener(receiver);

// Callback for when a message is received
function receiver(request, sender, sendResponse) {
	if (request.message === "user clicked!") {
		
	  	var textContent = document.body.innerText;
		var vervs = "";

		for(word of new Set(textContent.split(" "))) {
			if(word.endsWith("।")) {

				word = word.slice(0,-1);

				if (window.confirm(word)) {
					vervs+= word + " ";
				}
				
			}
		}
		console.log(vervs);
    
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
