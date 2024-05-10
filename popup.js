document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("blockButton").addEventListener("click", blockUrl);
  updateList();
  sendToBackground();
});

const blockUrl = () => {
  const url = document.getElementById("url").value;
  const time = document.getElementById("time").value;

  const data = window.localStorage.getItem("data");
  if (url !== "" && time !== "") {
    if (data === null) {
      const dataArray = [{ url, time }];
      window.localStorage.setItem("data", JSON.stringify(dataArray));
      sendToBackground();
    } else {
      const realData = JSON.parse(data);
      console.log(realData);
      const newData = { url, time };
      realData.push(newData);
      window.localStorage.setItem("data", JSON.stringify(realData));
      sendToBackground();
    }
  }
};

const truncateString = (string) => {
  const link = string.slice(0, 20);
  return `${link}...`;
};

const updateList = () => {
  const getData = window.localStorage.getItem("data");
  const data = JSON.parse(getData);
  let card = "";

  const blockCards = window.document.getElementsByClassName("blockeddiv");
  Array.from(blockCards).forEach((blockCard) => {
    blockCard.innerHTML = "";
    data.forEach((result, index) => {
      card += `
      <div class="blockedCard">
        <p>${truncateString(result.url)}</p>
        <p>${result.time}</p>
        <button class="unBlockButton" data-index="${index}">UNBLOCK</button>
      </div>
      `;
    });
    blockCard.innerHTML = card;
  });

  document.querySelectorAll(".unBlockButton").forEach((button) => {
    button.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      unBlock(index);
    });
  });
};

const unBlock = (id) => {
  const getData = window.localStorage.getItem("data");
  const data = JSON.parse(getData);
  if (id !== -1) {
    data.splice(id, 1)[0];
    window.localStorage.setItem("data", JSON.stringify(data));
    updateList();
    sendToBackground();
  } else {
    console.log("not found in the array.");
  }
};

const sendToBackground = () => {
  const getData = window.localStorage.getItem("data");
  if (getData !== null) {
    const data = JSON.parse(getData);
    chrome.runtime.sendMessage(data);
  }
};
