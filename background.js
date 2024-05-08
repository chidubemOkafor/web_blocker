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

// const getData = (url) => {
//   chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
//     console.log(data);
//     if (data.length != 0 && data) findMatchingUrl(url, data);
//   });
// };
// // Listen for tab updates
// chrome.tabs.onUpdated.addListener((changeInfo) => {
//   console.log(changeInfo);
//   if (changeInfo.status === "complete") {
//     const currentUrl = changeInfo.url;
//     console.log(currentUrl);
//     console.log("this is the changed info url", currentUrl);
//     getData(currentUrl);
//   }
// });

// chrome.tabs.onActivated.addListener((activeInfo) => {
//   // how to fetch tab url using activeInfo.tabid
//   chrome.tabs.get(activeInfo.tabId, (tab) => {
//     if (tab.status === "complete") {
//       const currentUrl = tab.url;
//       console.log("this is the current url", currentUrl);
//       getData(currentUrl);
//     }
//   });
// });
