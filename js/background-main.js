
chrome.contextMenus.create({
  type: "normal",
  title: "收藏至必收",
  id: "send2bs",
  contexts: ["all"],
  onclick: send2bs,
});

function send2bs() {
  chrome.tabs.getSelected(null, function (tab) {
    var currentUrl = tab.url;

    copyTextToClipboard(currentUrl);

    activeBS(tab.url);
  });
}

function copyTextToClipboard(text) {
  //Create a textbox field where we can insert text to.
  var copyFrom = document.createElement("textarea");

  //Set the text content to be the text you wished to copy.
  copyFrom.textContent = text;

  //Append the textbox field into the body as a child.
  //"execCommand()" only works when there exists selected text, and the text is inside
  //document.body (meaning the text is part of a valid rendered HTML element).
  document.body.appendChild(copyFrom);

  //Select all the text!
  copyFrom.select();

  //Execute command
  document.execCommand("copy");

  //(Optional) De-select the text using blur().
  copyFrom.blur();

  //Remove the textbox field from the document.body, so no other JavaScript nor
  //other elements can get access to this.
  document.body.removeChild(copyFrom);
}

function activeBS(url) {
  chrome.runtime.sendNativeMessage(
    "com.bishou.bishouapp",
    { url: "Hello" },
    function (response) {
      console.log("Received " + response);
    }
  );
}
