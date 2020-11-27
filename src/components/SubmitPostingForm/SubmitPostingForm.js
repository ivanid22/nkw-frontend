import React, { useState, useRef } from 'react';
import {
  FormControl,
  TextField,
  InputLabel,
  FormHelperText,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import styles from './SubmitPostingForm.module.scss';

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

const SubmitPostingForm = ({ submitPosting, submitStatus }) => {
  const [formData, setFormData] = useState({});
  const textFieldClasses = textfieldStyles();
  const buttonClasses = buttonStyles();
  const fileInputRef = useRef(null);

  const onSubmit = event => {
    event.preventDefault();
    const data = new FormData();
    data.append('posting[title]', formData.title);
    data.append('posting[description]', formData.description);
    data.append('posting[price]', formData.price);
    if (formData.contact_email !== '') data.append('posting[contact_email]', formData.contact_email);
    if (formData.contact_phone !== '') data.append('posting[contact_email]', formData.contact_phone);
    if (fileInputRef.current.files.length > 0) data.append('posting[picture]', fileInputRef.current.files[0]);
    submitPosting(data);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <FormControl>
        <InputLabel htmlFor="picture-input">Picture</InputLabel>
        <input ref={fileInputRef} type="file" id="picture-input" value={formData.picture} aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">Select a picture for your posting</FormHelperText>
      </FormControl>
      <FormControl>
        <TextField type="text" required className={textFieldClasses.root} variant="outlined" label="Title" placeholder="Title for your posting" onChange={e => setFormData({ ...formData, title: e.target.value })} />
      </FormControl>
      <FormControl>
        <TextField type="text" required className={textFieldClasses.root} variant="outlined" label="Description" placeholder="Brief description of your posting" onChange={e => setFormData({ ...formData, description: e.target.value })} />
      </FormControl>
      <FormControl>
        <TextField type="email" className={textFieldClasses.root} variant="outlined" label="Contact email" placeholder="Your contact email (optional)" onChange={e => setFormData({ ...formData, title: e.target.value })} />
      </FormControl>
      <FormControl>
        <Button disabled={submitStatus === 'submitting'} className={buttonClasses.root} type="submit">Create posting</Button>
      </FormControl>
    </form>
  );
};

SubmitPostingForm.propTypes = {
  submitPosting: PropTypes.func.isRequired,
  submitStatus: PropTypes.string.isRequired,
};

export default SubmitPostingForm;
