console.log("this is the content script.js");

chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
  blockSite(data);
});
const blockSite = (data) => {
  console.log("Message received in content script:", data);

  const href = window.location.href;
  console.log(href);

  for (let i = 0; i < data.length; i++) {
    if (href.includes(data[i].url)) {
      console.log("the data is here");
      document.body.innerHTML = `
              <div class= "mainDIv">
                <p class="text">
                  The website ${href} successfully blocked !
                </p>
              </div>
        `;
      break;
    }
    console.log("the data is not here");
  }
};
