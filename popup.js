document.getElementById("copyBtn").addEventListener("click", () => {
  browser.runtime.sendMessage({ command: "getJSFiles" });
});

browser.runtime.onMessage.addListener((message) => {
  if (message.jsFiles) {
    document.getElementById("jsList").textContent = message.jsFiles.join("\n");
    navigator.clipboard.writeText(message.jsFiles.join("\n"));
  }
});
