const jsListElement = document.getElementById("jsList");

// Load stored JavaScript URLs when the popup is opened
async function loadStoredJsFiles() {
  const { jsFiles = [] } = await browser.storage.local.get("jsFiles");
  jsFiles.forEach((url) => {
    const jsFileElement = document.createElement("div");
    jsFileElement.textContent = url;
    jsListElement.appendChild(jsFileElement);
  });
}

// Listen for new JavaScript files and update the popup in real-time
browser.runtime.onMessage.addListener((message) => {
  if (message.newJsFile) {
    const jsFileElement = document.createElement("div");
    jsFileElement.textContent = message.newJsFile;
    jsListElement.appendChild(jsFileElement);
  }
});

// Add "Copy All" button functionality
document.getElementById("copyBtn").addEventListener("click", () => {
  const allJsFiles = Array.from(jsListElement.children).map(div => div.textContent).join("\n");
  navigator.clipboard.writeText(allJsFiles);
});

// Load the stored JavaScript files on popup open
loadStoredJsFiles();
