window.onload = function () {
  document.getElementById("btn_s2bs").onclick = sendtobishou;
};

function sendtobishou() {

  chrome.tabs.getSelected(null, function (tab) {
    var currentUrl = tab.url;
   
    var linkInput =  document.getElementById("linkInput");
    linkInput.value = tab.url;
    linkInput.select();
    window.document.execCommand('copy');

    activeBS(tab.url);
    
  });
}

function activeBS(url){
    chrome.runtime.sendNativeMessage('com.bishou.bishouapp',
  { url: "Hello" },
  function(response) {
    console.log("Received " + response);
  });
}