console.log("this is the content script.js");

chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
  console.log("Message received in content script:", data);
});
