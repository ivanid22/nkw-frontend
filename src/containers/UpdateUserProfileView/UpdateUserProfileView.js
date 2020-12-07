import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LayoutContainer from '../../components/LayoutContainer/LayoutContainer';
import UserProfileForm from '../../components/UserProfileForm/UserProfileForm';
import { setUpdateUserProfileStatus } from '../../actions/userProfile';
import { startUpdateUserProfile } from '../../actions/api';

const UpdateUserProfileView = ({
  submitStatus,
  userProfile,
  updateProfile,
  updateSubmissionStatus,
}) => {
  const history = useHistory();

  useEffect(() => {
    if (submitStatus === 'success') {
      history.push('/');
      updateSubmissionStatus();
    }
  }, [submitStatus]);

  return (
    <LayoutContainer>
      <UserProfileForm
        submitForm={updateProfile}
        submitStatus={submitStatus}
        userProfile={userProfile}
      />
    </LayoutContainer>
  );
};

UpdateUserProfileView.propTypes = {
  submitStatus: PropTypes.string.isRequired,
  userProfile: PropTypes.objectOf(PropTypes.string).isRequired,
  updateSubmissionStatus: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  updateProfile: data => dispatch(startUpdateUserProfile(data)),
  updateSubmissionStatus: () => dispatch(setUpdateUserProfileStatus('idle')),
});

const mapStateToProps = state => ({
  submitStatus: state.applicationState.updateUserProfileStatus,
  userProfile: state.applicationState.userProfile,
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserProfileView);
