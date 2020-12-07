import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, TextField, Button, CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startSignUp } from '../../actions/api';
import LayoutContainer from '../../components/LayoutContainer/LayoutContainer';
import styles from './SignUpView.module.scss';

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
    borderRadius: '20px',
    border: 'none',
    marginBottom: '1em',

    '& fieldset': {
      borderRadius: '30px',
    },
  },
});

const SignUpView = ({ authState, dispatchLogin }) => {
  const history = useHistory();
  const buttonClasses = buttonStyles();
  const textFieldClasses = textfieldStyles();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: '',
  });

  const signingUp = () => authState.status === 'signingUp';
  const idle = () => ((authState.status === 'signUpFailed') || (authState.status === 'idle') || (authState.srarus === 'signInFailed'));
  const renderError = () => (
    authState.error
      ? (
        <Typography variant="subtitle2" color="error">
          { authState.error }
        </Typography>
      ) : null
  );

  const submitSignUp = e => {
    e.preventDefault();
    dispatchLogin({
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.password_confirmation,
    });
  };

  useEffect(() => {
    if (authState.status === 'signedIn') history.push('/');
  });

  return (
    <LayoutContainer>
      <div className={styles.bgContainer}>
        <div className={styles.content}>
          <div className={styles.sectionHeading}>
            <Typography variant="h2">Sign up</Typography>
            <Typography variant="subtitle1">Welcome to NKW!</Typography>
          </div>
          <form className={styles.formControls} onSubmit={submitSignUp}>
            <div className={styles.controlsWidth}>
              <TextField type="email" required className={textFieldClasses.root} variant="outlined" label="Email" placeholder="your@email.com" onChange={e => setFormData({ ...formData, email: e.target.value })} />
              <TextField type="password" required className={textFieldClasses.root} variant="outlined" label="Password" onChange={e => setFormData({ ...formData, password: e.target.value })} />
              <TextField type="password" required className={textFieldClasses.root} variant="outlined" label="Confirm password" onChange={e => setFormData({ ...formData, password_confirmation: e.target.value })} />
              <Button type="submit" className={buttonClasses.root} disabled={signingUp()}>
                { idle() ? <Typography variant="button"> Sign up </Typography> : <CircularProgress /> }
              </Button>
              { !idle() ? <Typography variant="subtitle1">Account creation can take up to 40 seconds</Typography> : null }
              { renderError() }
            </div>
          </form>
          <Typography variant="body1" color="textSecondary">
            Already have an account?
            <Link to="/sign_in">Sign in</Link>
          </Typography>
        </div>
      </div>
    </LayoutContainer>
  );
};

SignUpView.propTypes = {
  authState: PropTypes.objectOf(PropTypes.string).isRequired,
  dispatchLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authState: state.auth,
});

const mapDispatchToProps = dispatch => ({
  dispatchLogin: data => dispatch(startSignUp(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpView);
