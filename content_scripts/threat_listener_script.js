function getActiveTab() {
    return browser.tabs.query({
      currentWindow: true, active: true
    });
  }

browser.webRequest.onBeforeRequest.addListener(
(details) => {
    if (details.type === "main_frame" && details.url) {
    threats.push({
        type: "Redirecionamento",
        url: details.url,
        time: new Date().toLocaleString()
    });
    console.log("Redirecionamento suspeito detectado:", details.url);
    }
},
{ urls: ["<all_urls>"] }
);

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
      threats.push({
        type: "Mudança de URL",
        url: changeInfo.url,
        time: new Date().toLocaleString()
      });
      console.log("Mudança de URL detectada:", changeInfo.url);
    }
  });

const threatListener = async (tabs) => {


  }
getActiveTab().then(threatListener);