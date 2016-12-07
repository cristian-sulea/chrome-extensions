var idWindow;

var urlWindow = 'https://www.icloud.com/#notes2';

chrome.browserAction.onClicked.addListener(function() {

	if (idWindow) {
		chrome.windows.update(idWindow, {
			focused : true
		}, function(window) {
			if (chrome.runtime.lastError) {
				openWindow();
			}
		});
	}

	else {
		openWindow();
	}

});

function openWindow() {

	var xWindow = screen.width - screen.availWidth + 25;
	var yWindow = screen.height - screen.availHeight + 25;

	var widthWindow = screen.width - xWindow - 25;
	var heightWindow = screen.height - yWindow - 25;

	chrome.windows.create({
		'url' : urlWindow,
		'type' : 'popup',
		'focused' : true,
		'left' : xWindow,
		'top' : yWindow,
		'width' : widthWindow,
		'height' : heightWindow
	}, function(window) {
		idWindow = window.id;
	});
}
