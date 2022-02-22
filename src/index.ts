// Uncomment this block to reset the secret for debugging purposes
/*
	chrome.storage.sync.set({
		pass: null,
		secret: null
	});
	*/

chrome.browserAction.onClicked.addListener(() => {
	chrome.storage.sync.get(['baseUrl'], (key: { baseUrl: string; }) => {
			if (!key.baseUrl) {
				chrome.runtime.openOptionsPage();
			}
		}
	);
});
