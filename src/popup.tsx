import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Popup = () => {
	const url = 'jira/browse/';

	const [baseUrl, setBaseUrl] = useState<string>();
	const [jiraTicket, setJiraTicket] = useState<string>();

	const goToOptions = () => {
		chrome.runtime.openOptionsPage();
	};

	const goToJiraTicket = () => {
		if (jiraTicket) {
			chrome.tabs.create({url: `${baseUrl}${url}/${jiraTicket}`})
		}
	}

	chrome.storage.sync.get(['baseUrl'], (key: { baseUrl: string; }) => {
			if (!key.baseUrl) {
				return goToOptions();
			}

			setBaseUrl(key.baseUrl);
		}
	);

	return (
		<div style={{ minWidth: '300px' }}>
			<form>
				<input autoFocus placeholder='PROJECT-XXXX' onChange={(event) => setJiraTicket(event.target.value)} type="text"/>
				<button disabled={!jiraTicket} onClick={goToJiraTicket}>Go</button>
			</form>

			<button onClick={goToOptions} style={{ marginRight: '5px' }}>
				Options
			</button>
		</div>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<Popup />
	</React.StrictMode>,
	document.getElementById('root')
);
