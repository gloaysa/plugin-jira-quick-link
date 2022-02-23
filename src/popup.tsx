import React, {useState} from 'react';
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
      chrome.tabs.create({url: `${baseUrl}${url}${jiraTicket}`})
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
    <form className='has-text-centered'>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input className='input' autoFocus placeholder='PROJECT-XXXX'
                 onChange={(event) => setJiraTicket(event.target.value)} type="text"/>
        </div>
        <div className="control">
          <button className='button is-info' disabled={!jiraTicket} onClick={goToJiraTicket}>Go</button>
        </div>
      </div>
      <p className="is-size-7"><a onClick={goToOptions}>Jira Quick Link</a> by <a className='has-text-black' target='__blank' href="https://loaysa.com">Guillermo Loaysa</a></p>
    </form>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup/>
  </React.StrictMode>,
  document.getElementById('root')
);
