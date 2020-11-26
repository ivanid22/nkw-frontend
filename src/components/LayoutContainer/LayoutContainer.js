import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import ApplicationBar from '../ApplicationBar/ApplicationBar';
import DrawerMenu from '../../containers/DrawerMenu/DrawerMenu';

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    minHeight: '100vh',
    position: 'relative',
  },
});

const LayoutContainer = ({ children }) => {
  const styles = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Container maxWidth="md" className={styles.root}>
      <ApplicationBar menuOpen={() => setDrawerOpen(!drawerOpen)} />
      <DrawerMenu open={drawerOpen} onClose={() => setDrawerOpen(false)} container="appContainer" />
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
