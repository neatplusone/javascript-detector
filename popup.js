// Compatibility for Chrome and Firefox
if (typeof browser === "undefined") {
  var browser = chrome;
}

// Element to display the list of JS files
const jsListElement = document.getElementById("jsList");

// Request JS files from background.js when popup opens
browser.runtime.sendMessage({ action: "getJsFiles" }).then((response) => {
  if (response && response.jsFiles) {
    response.jsFiles.forEach((file) => {
      const jsFileElement = document.createElement("div");
      jsFileElement.textContent = file;
      jsListElement.appendChild(jsFileElement);
    });
  }
});

// "Copy All" functionality
document.getElementById("copyBtn").addEventListener("click", () => {
  const allJsFiles = Array.from(jsListElement.children)
    .map((div) => div.textContent)
    .join("\n");
  navigator.clipboard.writeText(allJsFiles);
});
