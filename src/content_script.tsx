console.log('content script root');

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	console.log(msg);
});
