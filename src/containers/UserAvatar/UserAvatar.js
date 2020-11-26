import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from './UserAvatar.module.scss';
import defaultPicture from '../../assets/default-user-image.png';

const UserAvatar = ({ userProfile }) => (
  <div className={styles.userAvatarContainer}>
    <img src={userProfile.avatar ? userProfile.avatar : defaultPicture} alt="profile pic" className={styles.userPicture} />
    <Typography variant="h5">
      {userProfile.name}
    </Typography>
    <Typography variant="h6">
      <Link className={styles.link} to="/user_profile">Edit profile</Link>
    </Typography>
  </div>
);

UserAvatar.propTypes = {
  userProfile: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default UserAvatar;
