const blockSite = (data) => {
  console.log("Blocking sites with data:", data);

  const href = window.location.href;
  console.log("Current URL:", href);

  for (let i = 0; i < data.length; i++) {
    if (href.includes(data[i].url)) {
      console.log("Blocking website:", data[i].url);
      document.body.innerHTML = `
        <div class="mainDIv">
          <p class="text">
            The website ${data[i].url} is successfully blocked until ${
        data[i].time
      } ${getTime(data[i].time)}
          </p>
        </div>
      `;
      return; // Exit the loop after blocking the site
    }
  }

  console.log("No matching website found to block.");
};

// Helper function to determine whether it's AM or PM
const getTime = (time) => {
  const hour = parseInt(time.split(":")[0]);
  return hour >= 12 ? "pm" : "am";
};

console.log("this is the content script.js");

// Always listen for messages from the background script
chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
  console.log("Data received from background script:", data);
  window.localStorage.setItem("data", JSON.stringify(data));
  const localData = JSON.parse(window.localStorage.getItem("data"));
  blockSite(localData);
});

// Get data from localStorage and block sites if data is available
const newData = window.localStorage.getItem("data");
if (newData !== null) {
  const data = JSON.parse(newData);
  blockSite(data);
}

const checkTime = () => {
  const getData = JSON.parse(window.localStorage.getItem("data"));
  const currentDate = new Date();
  const time = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  console.log("Current time:", time);

  for (let i = 0; i < getData.length; i++) {
    if (getData[i].time === time) {
      console.log("It's time to remove:", getData[i]);
      getData.splice(i, 1);
      window.localStorage.setItem("data", JSON.stringify(getData));
      chrome.runtime.sendMessage(getData);
      break;
    }
  }
};

checkTime();
