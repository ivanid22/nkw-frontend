import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers/index';
import App from './App';
import { signIn } from './actions/auth';
import reportWebVitals from './reportWebVitals';
import { startFetchPostings } from './actions/postings';
import { startFetchUserProfile } from './actions/applicationState';

const store = createStore(reducers, applyMiddleware(thunk));

const initLocalStorage = () => {
  const uid = localStorage.getItem('uid');
  const accessToken = localStorage.getItem('access-token');
  const client = localStorage.getItem('client');
  if (uid && accessToken && client) {
    store.dispatch(signIn({ uid, accessToken, client }));
    store.dispatch(startFetchUserProfile());
    store.dispatch(startFetchPostings());
  }
};

const storeAuthTokens = () => {
  const { uid, accessToken, client } = store.getState().auth;
  if (uid && accessToken && client) {
    localStorage.setItem('uid', uid);
    localStorage.setItem('access-token', accessToken);
    localStorage.setItem('client', client);
  }
};

store.subscribe(() => {
  storeAuthTokens();
});

initLocalStorage();

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
