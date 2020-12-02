import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  FormControl,
  TextField,
  Button,
} from '@material-ui/core';
import styles from './UserProfileForm.module.scss';
import defaultUserImage from '../../assets/default-user-image.png';

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

const url = process.env.REACT_APP_API_URL;

const UserProfileForm = ({ userProfile, submitForm, submitStatus }) => {
  const textFieldClasses = textfieldStyles();
  const formFieldClasses = formFieldStyles();
  const buttonClasses = buttonStyles();

  const [name, setName] = useState(userProfile.name || '');
  const [location, setLocation] = useState(userProfile.location || '');
  const [avatar, setAvatar] = useState(userProfile.avatar ? `${url}${userProfile.avatar}` : null);
  const fileInputRef = useRef(null);
  const previewReader = new FileReader();

  const onAvatarChange = () => {
    if (fileInputRef.current.files.length > 0) {
      previewReader.readAsDataURL(fileInputRef.current.files[0]);
    }
    console.log(fileInputRef.current.files[0]);
    console.log(avatar);
  };

  previewReader.addEventListener('load', () => {
    setAvatar(previewReader.result);
  });

  const onSubmit = event => {
    event.preventDefault();
    const data = new FormData();
    if (name !== '') data.append('user_profile[name]', name);
    if (location !== '') data.append('user_profile[location]', location);
    if (fileInputRef.current.files.length > 0) data.append('user_profile[avatar]', fileInputRef.current.files[0]);
    submitForm(data);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.userPicContainer}>
        <img src={avatar || defaultUserImage} alt="testing source" />
      </div>
      <label htmlFor="avatar-input">
        <input accept="image/*" ref={fileInputRef} type="file" id="avatar-input" className={styles.fileInputHidden} aria-describedby="avatar-image" onChange={onAvatarChange} />
        <Button className={buttonClasses.root} type="button" onClick={() => fileInputRef.current.click()}>Change picture</Button>
      </label>
      <FormControl className={formFieldClasses.root}>
        <TextField type="text" required className={textFieldClasses.root} variant="outlined" label="Name" value={name} onChange={e => setName(e.target.value)} />
      </FormControl>
      <FormControl className={formFieldClasses.root}>
        <TextField type="text" required className={textFieldClasses.root} variant="outlined" label="Location" onChange={e => setLocation(e.target.value)} />
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
  submitForm: PropTypes.func.isRequired,
};

export default UserProfileForm;
