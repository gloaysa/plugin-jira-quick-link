import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Options = () => {
	const [baseUrl, setBaseUrl] = useState<string>('');

	const [status, setStatus] = useState<string>('');

	useEffect(() => {
		chrome.storage.sync.get(['baseUrl'],(key: { baseUrl: string }) => {
				if (!baseUrl) {
					setBaseUrl(key.baseUrl ? key.baseUrl : '');
				}
			}
		);
	});

	const openShortCutsInChrome = () => {
		chrome.tabs.create({url: 'chrome://extensions/shortcuts'})
	}

	const saveOptions = () => {
		// Saves options to chrome.storage.sync.
		chrome.storage.sync.set({ baseUrl: baseUrl }, () => {
			let timeoutId;

			setStatus('Options saved.');
			timeoutId = setTimeout(() => {
				setStatus(undefined);
			}, 1000);
			return () => clearTimeout(timeoutId);
		});
	};

	const displayNotification = () => {
		if (status) {
			return <div className="notification is-primary">{status}</div>;
		}
		return (
			<div className="field is-centered">
				<button className="button is-info is-medium is-fullwidth" onClick={saveOptions} disabled={!baseUrl}>
					Guardar
				</button>
			</div>
		);
	};

	return (
		<>
			<div className="container">
				<section className="articles">
					<div className="columns is-mobile">
						<div className="column is-12-mobile is-8-desktop is-offset-2-desktop">
							{/* START ARTICLE */}
							<div className="card article">
								<div className="card-content">
									<div className="columns is-mobile is-centered is-vcentered">
										<div className="column is-narrow">
											<img src="../images/icons/60.png" alt="Jira Quick Link" />
										</div>
										<div className="column is-narrow">
											<span className="title">Jira Quick Link</span>
										</div>
									</div>

									<div className="field is-centered">
										<label className="label">Base URL</label>
										<div className="control has-icons-right">
											<input
												className="input"
												type='text'
												placeholder="https://issues.apache.org/"
												onChange={(event) => setBaseUrl(event.target.value)}
												value={baseUrl}
											/>
										</div>
									</div>

									<br />

									To make this plugin even better, navigate to <a href="" onClick={openShortCutsInChrome}>Chrome Shortcuts </a>
									 and add a custom keyboard shortcut to open it (I recommend Cmd + Control + J on MacOS)

									<br />
									<br />

									{displayNotification()}

									<hr />

									<div className="columns is-mobile is-centered">
										<div className="column is-half">
											<div className="image is-centered">
												<img src="https://media.giphy.com/media/3KC2jD2QcBOSc/giphy.gif" alt="party" />
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* END ARTICLE --> */}
						</div>
						{/* END COLUMN --> */}
					</div>
				</section>
				{/* END ARTICLE FEED */}
			</div>

			<footer className="footer">
				<div className="content has-text-centered">
					<p>
						<strong>Jira Quick Link</strong> - made with <span className="has-text-danger">&hearts;</span> by{' '}
						<a href="https://loaysa.com">Guillermo Loaysa</a>
					</p>
					<div className="tags has-addons level-item">
						<span className="tag is-rounded is-info">last update</span>
						<span className="tag is-rounded">March, 2022</span>
					</div>
				</div>
			</footer>
		</>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<Options />
	</React.StrictMode>,
	document.getElementById('root')
);
