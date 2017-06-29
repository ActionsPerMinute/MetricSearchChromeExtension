chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {//add listener to the url
   chrome.tabs.executeScript( null, { 
        file: "content.js"
    });
})
