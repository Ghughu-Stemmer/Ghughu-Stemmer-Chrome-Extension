$(function () {
    chrome.runtime.onMessage.addListener(receiver);
    var key = 'crawlerMode';

    function crawlLinks() {
        chrome.storage.local.get([key], function (result) {
            var pageURLs = [];
            
            if (result[key]) {
                console.log(result[key]);
                var links = $("a[href^='http']");
                console.log(links);
                links.each(function (index, element) {
                    //console.log(index, "th element");
                    //console.log(element);
                    // console.log(element);
                     let href = $(this).attr("href");
                     pageURLs.push(href);
                });
                // console.log(pageURLs);
                chrome.runtime.sendMessage({
                    "message": "open_new_tab",
                    "urls": pageURLs
                });
            }
        });
    }
    setInterval(crawlLinks, 20000);

    function receiver(request, sender, sendResponse) {
        if (request.message === "user clicked!") {
            console.log("clicked");
            chrome.storage.local.get([key], function (result) {
                if (result[key]) {
                    chrome.storage.local.set({
                        'crawlerMode': false
                    }, function () {
                        console.log('Value is set to ' + false);
                    });
                } else {
                    chrome.storage.local.set({
                        'crawlerMode': true
                    }, function () {
                        let windowId = request.windowId;
                        chrome.runtime.sendMessage({
                            "message": "set_window_id",
                            "windowId": windowId
                        });
                        console.log('Value is set to ' + true);
                    });
                }
            });
        }
    }
})