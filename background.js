var windowId;

chrome.browserAction.onClicked.addListener(function (tab) {
  var msg = {
    message: "user clicked!",
    windowId: tab.windowId
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
          "url": urls[urlIndex],
          "windowId": windowId,
          "active": false
        }, function(tab) {
          let id = tab.id;
          setTimeout(function(){
            chrome.tabs.remove(id);
          }, 60000);
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

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.message === "set_window_id") {
      windowId = request.windowId;
      console.log("window id: ");
      console.log(windowId);
    }
  }
);