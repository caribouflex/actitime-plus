//Global

chrome.tabs.onUpdated.addListener(showIntercomAction);


function showIntercomAction(tabId, changeInfo, tab) {
  if (tab.url.indexOf('actitime.distech-controls') > -1) {
    // Show icon for page action in the current tab.
    chrome.pageAction.show(tabId);
  }
};


