import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { startSignIn } from '../../actions/auth';
import LayoutContainer from '../../components/LayoutContainer/LayoutContainer';
import styles from './SignInView.module.scss';

const useStyles = makeStyles({
  button: {
    padding: '5px 10px',
    backgroundColor: 'orange',
    color: 'white',
    borderRadius: '5px',
  },
});

const SignInView = ({ authState, dispatchLogin }) => {
  const history = useHistory();
  const materialStyles = useStyles();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const submitLogin = e => {
    e.preventDefault();
    dispatchLogin({
      email: formData.email,
      password: formData.password,
    });
  };

  console.log(history);
  console.log(authState);

  return (
    <LayoutContainer>
      <div className={styles.bgContainer}>
        <div className={styles.content}>
          <form className={styles.signInForm} onSubmit={submitLogin}>
            <div className={styles.sectionHeading}>
              <Typography variant="h2">Sign in</Typography>
              <Typography variant="subtitle1">Hi there! Please sign in to continue</Typography>
            </div>
            <div className={styles.formControls}>
              <TextField type="email" variant="outlined" label="Email" placeholder="your@email.com" onChange={e => setFormData({ ...formData, email: e.target.value })} />
              <TextField type="password" variant="outlined" label="Password" onChange={e => setFormData({ ...formData, password: e.target.value })} />
              <Button type="submit" className={materialStyles.button}>
                <Typography variant="button"> Sign in </Typography>
              </Button>
            </div>
          </form>
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
