import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { startSignIn } from '../../actions/auth';
import styles from './SignInView.module.scss';

const SignInView = ({ authState, dispatchLogin }) => {
  const history = useHistory();
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
    <form className={styles.signInForm} onSubmit={submitLogin}>
      <div className={styles.pictureContainer} />
      <input type="email" placeholder="Email" onChange={e => setFormData({ ...formData, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setFormData({ ...formData, password: e.target.value })} />
      <input type="submit" />
    </form>
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
