import axios from 'axios';
import { PostingsActionType } from '../reducers/postingsReducer';
import { ApplicationStateActions } from '../reducers/applicationStateReducer';

const API_URL = process.env.REACT_APP_API_URL;

export const setPostings = postings => ({
  type: PostingsActionType.SET_POSTINGS,
  postings,
});

export const setPostingStatus = (status, postingId) => ({
  type: ApplicationStateActions.SET_CREATE_POSTING_STATUS,
  postingId,
  status,
});

export const startFetchPostings = () => (dispatch, getState) => {
  const { client, accessToken, uid } = getState().auth;
  axios({
    method: 'get',
    url: `${API_URL}/v1/postings`,
    headers: {
      client,
      uid,
      'access-token': accessToken,
      Accept: 'application/json',
    },
  }).then(response => {
    console.log('response ', response);
    if (response.status === '401') {
      dispatch({ type: 'SIGN_IN_FAILED', error: response.data });
    } else {
      dispatch(setPostings(response.data));
    }
  }).catch(error => {
    console.log('error', error);
    dispatch({ type: 'SIGN_IN_FAILED', error: error.message });
  });
};

export const startCreatePosting = data => (dispatch, getState) => {
  dispatch(setPostingStatus('submitting'));
  const { client, accessToken, uid } = getState().auth;
  axios({
    method: 'post',
    url: `${API_URL}/v1/postings`,
    headers: {
      client,
      uid,
      'access-token': accessToken,
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
    data,
  }).then(response => {
    if (response.status === 401) dispatch({ type: 'SIGN_OUT' });
    else {
      dispatch(setPostingStatus('success', response.data.id));
      dispatch(startFetchPostings());
    }
  }).catch(error => {
    dispatch(setPostingStatus('error'));
    console.log(error.message);
  });
};

export const startCreateFavorite = postingId => (dispatch, getState) => {
  const { client, accessToken, uid } = getState().auth;
  axios({
    method: 'post',
    url: `${API_URL}/v1/favorites`,
    headers: {
      client,
      uid,
      'access-token': accessToken,
      Accept: 'application/json',
    },
    data: {
      posting_id: postingId,
    },
  }).then(() => dispatch(startFetchPostings()));
};
