chrome.browserAction.onClicked.addListener(() => {
	chrome.storage.sync.get(['baseUrl'], (key: { baseUrl: string; }) => {
			if (!key.baseUrl) {
				chrome.runtime.openOptionsPage();
			}
		}
	);
});
