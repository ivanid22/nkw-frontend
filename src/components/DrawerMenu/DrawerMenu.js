import React from 'react';
import PropTypes from 'prop-types';
import {
  List, ListItem, ListItemIcon, ListItemText, Drawer,
} from '@material-ui/core';
import { Favorite, Person } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const drawerStyles = makeStyles({
  root: {
    backgroundColor: '#f7f5fA',
    color: '#959595',
  },
});

const DrawerMenu = ({ open, onClose }) => {
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
      </List>
    </Drawer>
  );
};

DrawerMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DrawerMenu;
