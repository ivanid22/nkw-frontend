import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Search from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const containerStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: '#f7f5fA',
    color: '#959595',
    boxShadow: 'none',
  },
});

const toolbarStyles = makeStyles({
  root: {
    justifyContent: 'space-between',
  },
});

const ApplicationBar = ({ menuOpen }) => {
  const containerClasses = containerStyles();
  const toolbarClasses = toolbarStyles();

  const shouldRender = () => {
    const location = useLocation();
    return ((location.pathname !== '/sign_in') && (location.pathname !== 'sign_up'));
  };

  const renderBar = () => (
    <AppBar className={containerClasses.root} position="static">
      <Toolbar className={toolbarClasses.root}>
        <IconButton edge="start" color="black" aria-label="menu" onClick={menuOpen}>
          <MenuIcon />
        </IconButton>
        <IconButton edge="end" color="black">
          <Search />
        </IconButton>
      </Toolbar>
    </AppBar>
  );

  return (
    <div className={containerClasses.root}>
      { shouldRender() ? renderBar() : null }
    </div>
  );
};

ApplicationBar.propTypes = {
  menuOpen: PropTypes.func.isRequired,
};

export default ApplicationBar;
