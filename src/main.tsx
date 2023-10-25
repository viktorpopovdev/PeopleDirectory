import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { store } from './store/store.ts';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider>
        <Notifications />
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>,
);
