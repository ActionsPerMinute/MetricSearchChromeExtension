chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {//add listener to the url
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs) {
        var tab = tabs[0];
        var url = tab.url;
        if(url.indexOf("METRIC_BROWSER") > -1){
            chrome.tabs.executeScript( null, {
                file: "content.js"
            });
        }
    });
    
})
