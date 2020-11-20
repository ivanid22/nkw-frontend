import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers/index';
import './index.css';
import App from './App';
import { startSignIn, /* startSignUp */ startSignOut } from './actions/auth';
import reportWebVitals from './reportWebVitals';

const store = createStore(reducers, applyMiddleware(thunk));

store.subscribe(() => {
  console.log(store.getState());
  console.log(store.getState().auth);
});

setTimeout(() => {
  const { client, uid } = store.getState().auth;
  store.dispatch(startSignOut(
    { client, uid, accessToken: 'wrong' },
  ));
}, 1000);

window.store = store;

store.dispatch(startSignIn({
  email: 'testorapido2@test.com',
  password: '12345678',
  password_confirmation: '12345678',
}));

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
