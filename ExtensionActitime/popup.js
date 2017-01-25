
document.addEventListener('DOMContentLoaded', function () {
  var divs = document.getElementById("transfer");
  
  divs.addEventListener('click', click);
});

function click(e) {
	
	var value = document.getElementById("date").value;
	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {date: value});
	});
	
	chrome.tabs.executeScript(null,{file: "content.js"});
	window.close();
}

