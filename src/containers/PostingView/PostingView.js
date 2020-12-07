import React from 'react';
import { useParams } from 'react-router-dom';
import { IconButton, Typography } from '@material-ui/core';
import { FavoriteBorder, Favorite } from '@material-ui/icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { startCreateFavorite } from '../../actions/api';
import LayoutContainer from '../../components/LayoutContainer/LayoutContainer';
import styles from './PostingView.module.scss';
import defaultPicture from '../../assets/default-posting-picture.png';
import { postingsFavoritedByUser } from '../../filters/postings';

const apiUrl = process.env.REACT_APP_API_URL;
const pictureUrl = (url = '') => (url ? `${apiUrl}${url}` : defaultPicture);

const defaultPosting = {
  title: 'Title',
  description: 'Description',
  favorites: [],
  contact_email: '',
  contact_phone: '',
  picture: '',
};

const PostingView = ({
  postings,
  addFavorite,
  favoritedPostings,
  uid,
}) => {
  const { postingId } = useParams();
  const posting = postings.filter(p => p.id.toString() === postingId)[0] || defaultPosting;

  const onFavoriteButtonClick = () => {
    addFavorite(posting.id);
  };

  const alreadyFavorited = () => {
    const fp = [...favoritedPostings];
    const m = fp.filter(p => p.favorites.some(f => (f.posting_id === posting.id)));
    return (m.length > 0);
  };

  const currentUserOwnsPosting = () => posting.user_profile_id === uid;

  const FavoriteButton = () => (
    <IconButton disabled={alreadyFavorited()} onClick={onFavoriteButtonClick}>
      { alreadyFavorited() ? <Favorite fontSize="large" /> : <FavoriteBorder fontSize="large" /> }
      Favorite
    </IconButton>
  );

  return (
    <LayoutContainer>
      <div className={styles.postingViewContainer}>
        <div className={styles.postingImageContainer}>
          <img src={pictureUrl(posting.picture || '')} className={styles.postingImage} alt="Posting" />
        </div>
        <div className={styles.postingDetailsContainer}>
          <div className={styles.postingTitleContainer}>
            <Typography variant="h3">
              { posting.title }
            </Typography>
            <div className={styles.favoriteButtonContainer}>
              { !currentUserOwnsPosting() ? <FavoriteButton /> : null }
            </div>
          </div>
          <div className={styles.postingDescription}>
            <Typography variant="body1">
              { posting.description }
            </Typography>
          </div>
          <div className={styles.postingDetailsItem}>
            <Typography variant="h5"> Contact phone </Typography>
            <Typography variant="body1">
              { posting.contact_phone ? posting.contact_phone : 'Not specified' }
            </Typography>
          </div>
          <div className={styles.postingDetailsItem}>
            <Typography variant="h5"> Listed price </Typography>
            <Typography variant="body1">
              { posting.price ? `$ ${posting.price}` : '$ 0' }
            </Typography>
          </div>
          <div className={styles.postingDetailsItem}>
            <Typography variant="h5"> Contact email </Typography>
            <Typography variant="body1">
              { posting.contact_email ? posting.contact_email : 'Not specified' }
            </Typography>
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
};

PostingView.propTypes = {
  postings: PropTypes.arrayOf(PropTypes.string).isRequired,
  addFavorite: PropTypes.func.isRequired,
  favoritedPostings: PropTypes.arrayOf(PropTypes.object).isRequired,
  uid: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  postings: state.postings,
  favoritedPostings: postingsFavoritedByUser(state.applicationState.userProfile.id, state.postings),
  uid: state.applicationState.userProfile.id,
});

const mapDispatchToProps = dispatch => ({
  addFavorite: postingId => dispatch(startCreateFavorite(postingId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostingView);
