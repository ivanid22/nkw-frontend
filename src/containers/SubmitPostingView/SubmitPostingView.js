import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { startCreatePosting } from '../../actions/postings';
import LayoutContainer from '../../components/LayoutContainer/LayoutContainer';
import SubmitPostingForm from '../../components/SubmitPostingForm/SubmitPostingForm';

const SubmitPostingView = ({ submitPosting, authStatus }) => {
  useEffect(() => {
    if (authStatus !== 'signedIn') useHistory().push('/sign_in');
  });

  return (
    <LayoutContainer>
      <SubmitPostingForm submitPosting={submitPosting} />
    </LayoutContainer>
  );
};

SubmitPostingView.propTypes = {
  submitPosting: PropTypes.func.isRequired,
  authStatus: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  authStatus: state.auth.status,
});

const mapDispatchToProps = dispatch => ({
  submitPosting: data => dispatch(startCreatePosting(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmitPostingView);
