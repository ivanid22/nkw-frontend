import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  List, ListItem, ListItemIcon, ListItemText, Drawer,
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Favorite,
  Person,
  ExitToApp,
  Add,
  Note,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import { startSignOut } from '../../actions/auth';

const drawerStyles = makeStyles({
  root: {
    backgroundColor: '#f7f5fA',
    color: '#959595',
  },
});

const linkStyles = makeStyles({
  root: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

const DrawerMenu = ({
  open,
  onClose,
  userProfile,
  authStatus,
  signOut,
}) => {
  const drawerClasses = drawerStyles();
  const linkClasses = linkStyles();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if ((authStatus !== 'signedIn') && (!['/sign_in', '/sign_up'].includes(location.pathname))) history.push('/sign_in');
  }, [authStatus]);

  const SignoutLink = () => (
    <ListItem className={linkClasses.root} onClick={() => signOut()}>
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText>
        Sign out
      </ListItemText>
    </ListItem>
  );

  const onMenuClick = url => {
    onClose();
    history.push(url);
  };

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
        <ListItem className={linkClasses.root} onClick={() => onMenuClick('/favorites')}>
          <ListItemIcon>
            <Favorite />
          </ListItemIcon>
          <ListItemText> Favorites </ListItemText>
        </ListItem>

        <ListItem className={linkClasses.root} onClick={() => onMenuClick('/user/postings')}>
          <ListItemIcon>
            <Note />
          </ListItemIcon>
          <ListItemText> Your postings </ListItemText>
        </ListItem>

        <ListItem className={linkClasses.root} onClick={() => onMenuClick('/postings/create')}>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText> Add a posting </ListItemText>
        </ListItem>

        <ListItem className={linkClasses.root} onClick={() => onMenuClick('/user/profile')}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText> Edit your profile </ListItemText>
        </ListItem>

        { userProfile !== {} ? <SignoutLink /> : null }
      </List>
    </Drawer>
  );
};

DrawerMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userProfile: PropTypes.objectOf(PropTypes.string).isRequired,
  authStatus: PropTypes.string.isRequired,
  signOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userProfile: state.applicationState.userProfile,
  authStatus: state.auth.status,
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(startSignOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);
