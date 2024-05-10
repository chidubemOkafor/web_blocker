chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, data);
    });
  });
});
