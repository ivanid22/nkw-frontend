import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, FormControl, TextField, Button } from '@material-ui/core';
import styles from './UserProfileForm.module.scss';
import UserAvatar from '../../components/UserAvatar/UserAvatar';

const buttonStyles = makeStyles({
  root: {
    padding: '10px 30px',
    backgroundColor: '#ff5617',
    color: 'white',
    borderRadius: '25px',
    maxWidth: '220px',
    alignSelf: 'center',

    '&:hover': {
      backgroundColor: '#b03000',
    },
  },
});

const textfieldStyles = makeStyles({
  root: {
    maxWidth: '480px',
    border: 'none',
    marginBottom: '1em',

    '& fieldset': {
      borderRadius: '30px',
    },
  },
});

const formFieldStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',

    '& > *': {
      width: '100%',
    },
  },
});

const UserProfileForm = ({ userProfile, onSubmit, submitStatus }) => {
  const textFieldClasses = textfieldStyles();
  const formFieldClasses = formFieldStyles();
  const buttonClasses = buttonStyles();

  const [formData, setFormData] = useState({});
  const [avatar, setAvatar] = useState({ avatar: '' });
  const fileInputRef = useRef(null);
  const previewReader = new FileReader();

  const onAvatarChange = () => {
    if (fileInputRef.current.files.length > 0) {
      previewReader.readAsDataURL(fileInputRef.current.files[0]);
      setAvatar({
        avatar: previewReader.result,
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <UserAvatar userProfile={avatar} />
      <label htmlFor="avatar-input">
        <input accept="image/*" ref={fileInputRef} type="file" id="avatar-input" className={styles.fileInputHidden} value={formData.picture} aria-describedby="avatar-image" onChange={onAvatarChange} />
        <Button className={buttonClasses.root} type="button">Change picture</Button>
      </label>
      <FormControl className={formFieldClasses.root}>
        <TextField type="text" required className={textFieldClasses.root} variant="outlined" label="Name" placeholder={userProfile.name ? userProfile.name : null} onChange={e => setFormData({ ...formData, title: e.target.value })} />
      </FormControl>
      <FormControl className={formFieldClasses.root}>
        <TextField type="text" required className={textFieldClasses.root} variant="outlined" label="Location" placeholder={userProfile.location ? userProfile.location : null} onChange={e => setFormData({ ...formData, location: e.target.value })} />
      </FormControl>
      <FormControl className={formFieldClasses.root}>
        <Button disabled={submitStatus === 'submitting'} className={buttonClasses.root} type="submit">Submit</Button>
      </FormControl>
    </form>
  );
};

UserProfileForm.propTypes = {
  userProfile: PropTypes.objectOf(PropTypes.string).isRequired,
  submitStatus: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default UserProfileForm;
