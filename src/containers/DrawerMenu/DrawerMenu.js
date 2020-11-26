import React from 'react';
import PropTypes from 'prop-types';
import {
  List, ListItem, ListItemIcon, ListItemText, Drawer,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Favorite, Person, ExitToApp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import UserAvatar from '../UserAvatar/UserAvatar';

const drawerStyles = makeStyles({
  root: {
    backgroundColor: '#f7f5fA',
    color: '#959595',
  },
});

const DrawerMenu = ({ open, onClose, userProfile }) => {
  const drawerClasses = drawerStyles();

  return (
    <Drawer
      open={open}
      anchor="left"
      className={drawerClasses.root}
      onClose={onClose}
      PaperProps={{ style: { position: 'absolute', 'min-width': '75%' } }}
      BackdropProps={{ style: { position: 'absolute' } }}
      ModalProps={{
        container: document.getElementById('appContainer'),
        style: {
          position: 'absolute',
        },
      }}
    >
      <List>
        { userProfile !== {} ? <UserAvatar userProfile={userProfile} /> : null }
        <ListItem>
          <ListItemIcon>
            <Favorite />
          </ListItemIcon>
          <ListItemText> Favorites </ListItemText>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText> Your postings </ListItemText>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText>
            <Link to="/sign_out" style={{ color: 'inherit', textDecoration: 'none' }}>Sign out</Link>
          </ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
};

DrawerMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userProfile: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = state => ({
  userProfile: state.applicationState.userProfile,
});

export default connect(mapStateToProps)(DrawerMenu);
