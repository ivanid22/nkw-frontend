import React from 'react';
import PropTypes from 'prop-types';
import { Favorite } from '@material-ui/icons';
import { IconButton, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import styles from './PostingsListItem.module.scss';
import defaultPicture from '../../assets/default-posting-picture.png';

const url = process.env.REACT_APP_API_URL;

const pictureUrl = posting => (posting.picture ? `${url}${posting.picture}` : defaultPicture);

const PostingsListItem = ({ posting }) => {
  const history = useHistory();

  const onContainerClick = () => history.push(`/postings/${posting.id}`);

  return (
    <div className={styles.postingsListItemContainer} aria-hidden="true" onClick={() => onContainerClick()}>
      <div className={styles.postingPictureContainer}>
        <img
          className={styles.postingPicture}
          src={pictureUrl(posting)}
          alt="posting"
        />
      </div>
      <div className={styles.postingSummaryContainer}>
        <div className={styles.nameContainer}>
          <Typography variant="h5">{posting.title}</Typography>
          <div className={styles.favoritesContainer}>
            <IconButton disabled>
              <Favorite />
            </IconButton>
            <Typography variant="caption">
              {posting.favorites.length}
            </Typography>
          </div>
        </div>
        <div className={styles.nameContainer}>
          <Typography variant="h4">{`$ ${posting.price ? posting.price : 0}`}</Typography>
          <Typography variant="subtitle1"> Listed price </Typography>
        </div>
      </div>
    </div>
  );
};

PostingsListItem.propTypes = {
  posting: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    favorites: PropTypes.arrayOf(
      PropTypes.shape({
        user_profile_id: PropTypes.string,
        posting_id: PropTypes.string,
      }),
    ),
    price: PropTypes.string,
    picture: PropTypes.string,
  }).isRequired,
};

export default PostingsListItem;
