chrome.browserAction.onClicked.addListener(function (tab) {
  var msg = {
    message: "user clicked!"
  }
  chrome.tabs.sendMessage(tab.id, msg);
});

var urlIndex = 0;
var urls = [];


setInterval(function () {
  var key = 'crawlerMode';
  chrome.storage.local.get([key], function (result) {
    if (result[key]) {
      if (urls.length > urlIndex) {
        chrome.tabs.create({
          "url": urls[urlIndex]
        });
        urlIndex++;
      }
    }
  })
}, 6000);

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.message === "open_new_tab") {
      newURLs = request.urls;
      urls = [...urls, ...newURLs];
      urls = [...new Set(urls)];
    }
  }
);