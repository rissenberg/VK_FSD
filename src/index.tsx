import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import {AdaptivityProvider, ConfigProvider} from "@vkontakte/vkui";
import '@vkontakte/vkui/dist/vkui.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ConfigProvider appearance="light">
    <AdaptivityProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AdaptivityProvider>
  </ConfigProvider>,
);
