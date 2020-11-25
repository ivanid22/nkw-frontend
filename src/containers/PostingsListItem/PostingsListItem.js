import React from 'react';
import PropTypes from 'prop-types';
import { Favorite } from '@material-ui/icons';
import { IconButton, Typography } from '@material-ui/core';
import styles from './PostingsListItem.module.scss';

const pictureUrl = posting => (posting.picture ? posting.picture : 'default');

const PostingsListItem = ({ posting }) => (
  <div className={styles.postingsListItemContainer}>
    <div className={styles.postingPictureContainer}>
      <img className={styles.postingPicture} src={pictureUrl()} alt="posting" />
    </div>
    <div className={styles.postingSummaryContainer}>
      <div className={styles.nameContainer}>
        <Typography variant="h5">
          { posting.title }
        </Typography>
        <div className={styles.favoritesContainer}>
          <IconButton disabled>
            <Favorite />
          </IconButton>
          <Typography variant="caption">
            { posting.favorites.length }
          </Typography>
        </div>
      </div>
      <div className={styles.nameContainer}>
        <Typography variant="h4">
          { `$ ${posting.price}` }
        </Typography>
        <Typography variant="subtitle1"> Negotiable </Typography>
      </div>
    </div>
  </div>
);

PostingsListItem.propTypes = {
  posting: PropTypes.shape({
    title: PropTypes.string,
    favorites: PropTypes.arrayOf(PropTypes.shape({
      user_profile_id: PropTypes.string,
      posting_id: PropTypes.string,
    })),
    price: PropTypes.string,
    picture: PropTypes.string,
  }).isRequired,
};

export default PostingsListItem;