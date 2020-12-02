import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LayoutContainer from '../../components/LayoutContainer/LayoutContainer';
import UserProfileForm from '../../components/UserProfileForm/UserProfileForm';
import { startUpdateUserProfile } from '../../actions/userProfile';

const UpdateUserProfileView = ({ submitStatus, userProfile, updateProfile }) => {
  const history = useHistory();

  useEffect(() => {
    if (submitStatus === 'success') history.push('/');
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
  updateProfile: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  updateProfile: data => dispatch(startUpdateUserProfile(data)),
});

const mapStateToProps = state => ({
  submitStatus: state.applicationState.updateUserProfileStatus,
  userProfile: state.applicationState.userProfile,
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserProfileView);
