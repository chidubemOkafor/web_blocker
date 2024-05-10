const getDataAndSendToContent = () => {
  chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, data);
    });
  });
};

chrome.tabs.onUpdated.addListener((changeInfo) => {
  getDataAndSendToContent();
  console.log("tabchanged");
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  getDataAndSendToContent();
  console.log("tabactivated");
});
