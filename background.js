let jsFiles = [];

browser.webRequest.onCompleted.addListener(
  (details) => {
    if (details.url.endsWith(".js")) {
      jsFiles.push(details.url);
    }
  },
  { urls: ["<all_urls>"] }
);

browser.runtime.onMessage.addListener((message) => {
  if (message.command === "getJSFiles") {
    browser.runtime.sendMessage({ jsFiles });
  }
});
