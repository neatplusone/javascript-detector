let jsFiles = [];

// Listen for JS file requests and add detected JS files to `jsFiles`
browser.webRequest.onCompleted.addListener(
  (details) => {
    if (details.url.match(/\.js(\?.*)?$/)) {
      if (!jsFiles.includes(details.url)) {
        jsFiles.push(details.url);
        // Store JS file but avoid sending message if popup is not open
      }
    }
  },
  { urls: ["<all_urls>"] }
);

// Clear the list when a new page loads
browser.webNavigation.onCompleted.addListener(() => {
  jsFiles = [];
});

// Respond to messages from popup.js
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getJsFiles") {
    sendResponse({ jsFiles });
  }
});
