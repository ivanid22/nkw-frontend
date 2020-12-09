import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setPostingStatus } from '../../actions/postings';
import { startCreatePosting } from '../../actions/api';
import LayoutContainer from '../../components/LayoutContainer/LayoutContainer';
import SubmitPostingForm from '../../components/SubmitPostingForm/SubmitPostingForm';

const SubmitPostingView = ({
  submitPosting,
  authStatus,
  submitStatus,
  createdPostingId,
  updateSubmissionStatus,
}) => {
  const history = useHistory();

  useEffect(() => {
    if (authStatus !== 'signedIn') history.push('/sign_in');
  });

  useEffect(() => {
    if (submitStatus === 'success') {
      history.push(`/postings/${createdPostingId}`);
      updateSubmissionStatus();
    }
  }, [submitStatus]);

  return (
    <LayoutContainer>
      <SubmitPostingForm submitPosting={submitPosting} submitStatus={submitStatus} />
    </LayoutContainer>
  );
};

SubmitPostingView.propTypes = {
  submitPosting: PropTypes.func.isRequired,
  authStatus: PropTypes.string.isRequired,
  submitStatus: PropTypes.string.isRequired,
  createdPostingId: PropTypes.string.isRequired,
  updateSubmissionStatus: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authStatus: state.auth.status,
  submitStatus: state.applicationState.createPostingStatus,
  createdPostingId: state.applicationState.createdPostingId,
});

const mapDispatchToProps = dispatch => ({
  submitPosting: data => dispatch(startCreatePosting(data)),
  updateSubmissionStatus: () => dispatch(setPostingStatus('idle')),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmitPostingView);
