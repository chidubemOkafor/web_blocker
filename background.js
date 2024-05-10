// // Function to check if the URL matches any data
// // const findMatchingUrl = (currentUrl, data) => {
// //   if (!currentUrl) {
// //     console.log("No URL received");
// //     return;
// //   }

// //   console.log("Received URL:", currentUrl);

// //   let matched = false;
// //   for (let i = 0; i < data.length; i++) {
// //     if (currentUrl === data[i].url) {
// //       console.log("Matching URL detected:", currentUrl);
// //       matched = true;
// //       break; // Exit loop if a match is found
// //     }
// //   }

// //   if (!matched) {
// //     console.log("URL does not match any data:", currentUrl);
// //   }
// // };

const getDataAndSendToContent = () => {
  chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, data);
    });
  });
};
// Listen for tab updates
chrome.tabs.onUpdated.addListener((changeInfo) => {
  getDataAndSendToContent();
  console.log("tabchanged");
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  // how to fetch tab url using activeInfo.tabid
  getDataAndSendToContent();
  console.log("tabactivated");
});
