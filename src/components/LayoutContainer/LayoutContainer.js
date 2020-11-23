import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    background: 'lightgray',
    minHeight: '100vh',
  },
});

const LayoutContainer = ({ children }) => {
  const styles = useStyles();

  return (
    <Container maxWidth="md" className={styles.root}>
      { children }
    </Container>
  );
};

LayoutContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

LayoutContainer.defaultProps = {
  children: [],
};

export default LayoutContainer;
