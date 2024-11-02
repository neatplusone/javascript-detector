// Compatibility for Chrome and Firefox
if (typeof browser === "undefined") {
  var browser = chrome;
}

let jsFiles = [];

// Initialize jsFiles from storage at startup
browser.storage.local.get("jsFiles", (result) => {
  if (result.jsFiles) {
    jsFiles = result.jsFiles;
  }
});

// Listen for JS file load events
browser.webRequest.onCompleted.addListener(
  (details) => {
    if (details.url.match(/\.js(\?.*)?$/)) {
      if (!jsFiles.includes(details.url)) {
        jsFiles.push(details.url);
        
        // Update local storage whenever a new JS file is added
        browser.storage.local.set({ jsFiles });
      }
    }
  },
  { urls: ["<all_urls>"] }
);

// Clear jsFiles when a new page loads
browser.webNavigation.onCompleted.addListener(() => {
  jsFiles = [];
  browser.storage.local.set({ jsFiles: [] }); // Clear storage
});

// Listen for messages from popup.js
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getJsFiles") {
    sendResponse({ jsFiles });
  }
});
