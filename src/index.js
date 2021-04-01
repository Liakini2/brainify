import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {HashRouter, BrowserRouter} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import {UserProvider} from './context/UserContext'
import {GameProvider} from './context/GameContext';
import {createBrowserHistory} from 'history';

const Router = process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter;
const history = createBrowserHistory();
ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <UserProvider>
        <GameProvider>
          <App />
        </GameProvider>
      </UserProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
