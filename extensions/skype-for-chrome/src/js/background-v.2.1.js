/*
 * v.2.1
 */

var theWindowId;

chrome.browserAction.onClicked.addListener(function() {

	if (theWindowId) {
		chrome.windows.update(theWindowId, {
			focused : true
		}, function(window) {
			if (chrome.runtime.lastError) {
				openTheWindow();
			}
		});
	}

	else {
		openTheWindow();
	}

});

function openTheWindow() {

	var theWindowX = screen.width - screen.availWidth + 25;
	var theWindowY = screen.height - screen.availHeight + 25;

	var theWindowWidth = initWindowWidth;
	var theWindowHeight = screen.height - theWindowY - 25;

	if (localStorage.theWindowWidth) {
		theWindowWidth = Number(localStorage.theWindowWidth);
	}

	else {

		if (theWindowWidth > screen.availWidth) {
			theWindowWidth = Math.max(theWindowWidth, Math
					.round(screen.availWidth * 3 / 4));
		}
	}

	chrome.windows.create({
		"url" : initWindowURL,
		"type" : "popup",
		"focused" : true,
		"left" : theWindowX,
		"top" : theWindowY,
		"width" : theWindowWidth,
		"height" : theWindowHeight
	}, function(window) {
		theWindowId = window.id;
	});

}

setInterval(function() {
	if (theWindowId) {
		chrome.windows.get(theWindowId, function(window) {
			if (!chrome.runtime.lastError) {
				localStorage.theWindowWidth = window.width;
			}
		});
	}
}, 5000);
