import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import styles from './UserAvatar.module.scss';
import defaultPicture from '../../assets/default-user-image.png';

const url = process.env.REACT_APP_API_URL;

const UserAvatar = ({ userProfile }) => (
  <div className={styles.userAvatarContainer}>
    <img src={userProfile.avatar ? `${url}${userProfile.avatar}` : defaultPicture} alt="profile pic" className={styles.userPicture} />
    <Typography variant="h5">
      {userProfile.name}
    </Typography>
  </div>
);

UserAvatar.propTypes = {
  userProfile: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default UserAvatar;
