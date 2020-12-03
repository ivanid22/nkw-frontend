import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, TextField, Button, CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startSignIn } from '../../actions/auth';
import LayoutContainer from '../../components/LayoutContainer/LayoutContainer';
import styles from './SignInView.module.scss';

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

const SignInView = ({ authState, dispatchLogin }) => {
  const history = useHistory();
  const buttonClasses = buttonStyles();
  const textFieldClasses = textfieldStyles();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const signingIn = () => authState.status === 'signingIn';
  const idle = () => ((authState.status === 'signInFailed') || (authState.status === 'idle'));
  const renderError = () => (
    authState.error
      ? (
        <Typography variant="subtitle2" color="error">
          { authState.error }
        </Typography>
      ) : null
  );

  const submitLogin = e => {
    e.preventDefault();
    dispatchLogin({
      email: formData.email,
      password: formData.password,
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
            <Typography variant="h2">Sign in</Typography>
            <Typography variant="subtitle1">Hi there! Please sign in to continue</Typography>
          </div>
          <form className={styles.formControls} onSubmit={submitLogin}>
            <div className={styles.controlsWidth}>
              <TextField type="email" required className={textFieldClasses.root} variant="outlined" label="Email" placeholder="your@email.com" onChange={e => setFormData({ ...formData, email: e.target.value })} />
              <TextField type="password" required className={textFieldClasses.root} variant="outlined" label="Password" onChange={e => setFormData({ ...formData, password: e.target.value })} />
              <Button type="submit" className={buttonClasses.root} disabled={signingIn()}>
                { idle() ? <Typography variant="button"> Sign in </Typography> : <CircularProgress /> }
              </Button>
              { !idle() ? <Typography variant="subtitle1">Authentication can take up to 40 seconds</Typography> : null }
              { renderError() }
            </div>
          </form>
          <Typography variant="body1" color="textSecondary">
            Don&apos;t have an account?
            <Link to="/sign_up">Sign up</Link>
          </Typography>
        </div>
      </div>
    </LayoutContainer>
  );
};

SignInView.propTypes = {
  authState: PropTypes.objectOf(PropTypes.string).isRequired,
  dispatchLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authState: state.auth,
});

const mapDispatchToProps = dispatch => ({
  dispatchLogin: data => dispatch(startSignIn(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInView);
