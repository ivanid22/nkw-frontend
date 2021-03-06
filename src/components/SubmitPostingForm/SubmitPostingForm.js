import React, { useState, useRef } from 'react';
import {
  FormControl,
  TextField,
  Button,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from './SubmitPostingForm.module.scss';
import defaultPicture from '../../assets/default-posting-picture.png';

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
    marginTop: '0.5em',
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

const SubmitPostingForm = ({
  submitPosting,
  submitStatus,
}) => {
  const [formData, setFormData] = useState({});
  const [picture, setPicture] = useState(null);
  const textFieldClasses = textfieldStyles();
  const buttonClasses = buttonStyles();
  const formFieldClasses = formFieldStyles();
  const fileInputRef = useRef(null);
  const fileReader = new FileReader();

  const onSubmit = event => {
    event.preventDefault();
    const data = new FormData();
    data.append('posting[title]', formData.title);
    data.append('posting[description]', formData.description);
    data.append('posting[price]', formData.price);
    if (formData.contact_email !== '') data.append('posting[contact_email]', formData.contactEmail);
    if (formData.contact_phone !== '') data.append('posting[contact_phone]', formData.contactPhone);
    if (fileInputRef.current.files.length > 0) data.append('posting[picture]', fileInputRef.current.files[0]);
    submitPosting(data);
  };

  const onFileSelect = () => {
    if (fileInputRef.current.files.length > 0) {
      fileReader.readAsDataURL(fileInputRef.current.files[0]);
    }
  };

  fileReader.addEventListener('load', () => {
    setPicture(fileReader.result);
  });

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <FormControl className={formFieldClasses.root}>
        <input ref={fileInputRef} type="file" id="picture-input" className={styles.fileInput} onChange={onFileSelect} />
        <div className={styles.pictureContainer}>
          <img src={picture || defaultPicture} alt="Posting description" />
        </div>
        <Button
          className={buttonClasses.root}
          onClick={() => fileInputRef.current.click()}
        >
          Add picture
        </Button>
      </FormControl>
      <FormControl className={formFieldClasses.root}>
        <TextField type="text" required className={textFieldClasses.root} variant="outlined" label="Title" placeholder="Title for your posting" onChange={e => setFormData({ ...formData, title: e.target.value })} />
      </FormControl>
      <FormControl className={formFieldClasses.root}>
        <TextField multiline rows={4} type="text" required className={textFieldClasses.root} variant="outlined" label="Description" placeholder="Brief description of your posting" onChange={e => setFormData({ ...formData, description: e.target.value })} />
      </FormControl>
      <FormControl className={formFieldClasses.root}>
        <TextField type="text" required className={textFieldClasses.root} variant="outlined" label="Price" onChange={e => setFormData({ ...formData, price: e.target.value })} />
      </FormControl>
      <FormControl className={formFieldClasses.root}>
        <TextField type="email" className={textFieldClasses.root} variant="outlined" label="Contact email" placeholder="Your contact email (optional)" onChange={e => setFormData({ ...formData, contactEmail: e.target.value })} />
      </FormControl>
      <FormControl className={formFieldClasses.root}>
        <TextField type="text" className={textFieldClasses.root} variant="outlined" label="Contact phone" placeholder="Your contact phone (optional)" onChange={e => setFormData({ ...formData, contactPhone: e.target.value })} />
      </FormControl>
      <FormControl className={formFieldClasses.root}>
        <Button disabled={submitStatus === 'submitting'} className={buttonClasses.root} type="submit">
          { (submitStatus === 'submitting') ? <CircularProgress /> : <Typography variant="button">Submit</Typography> }
        </Button>
      </FormControl>
    </form>
  );
};

SubmitPostingForm.propTypes = {
  submitPosting: PropTypes.func.isRequired,
  submitStatus: PropTypes.string.isRequired,
};

export default SubmitPostingForm;
