// Compatibility for browser or chrome APIs
const storage = browser?.storage || chrome.storage;
const runtime = browser?.runtime || chrome.runtime;
const webRequest = browser?.webRequest || chrome.webRequest;
const tabs = browser?.tabs || chrome.tabs;

// Array to hold JS files
let jsFiles = [];

// Detect JavaScript files and store them
webRequest.onCompleted.addListener(
  async (details) => {
    if (details.url.match(/\.js(\?.*)?$/)) {
      storage.local.get("jsFiles", (result) => {
        jsFiles = result.jsFiles || [];
        if (!jsFiles.includes(details.url)) {
          jsFiles.push(details.url);
          storage.local.set({ jsFiles });
          const runtime = browser?.runtime || chrome.runtime;

          // Send the message if runtime is available
          // In background.js
try {
  runtime?.sendMessage({ newJsFile: details.url });
} catch (error) {
  console.error("Error sending message:", error);
}


        }
      });
    }
  },
  { urls: ["<all_urls>"] }
);

// Reset stored JS files when a new page loads
tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    storage.local.set({ jsFiles: [] });
  }
});
