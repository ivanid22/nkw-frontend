import React from 'react';
import { useParams } from 'react-router-dom';
import { IconButton, Typography } from '@material-ui/core';
import { FavoriteOutlined, Favorite } from '@material-ui/icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { startCreateFavorite } from '../../actions/postings';
import LayoutContainer from '../../components/LayoutContainer/LayoutContainer';
import styles from './PostingView.module.scss';
import defaultPicture from '../../assets/default-posting-picture.png';
import { postingsFavoritedByUser } from '../../filters/postings';

const pictureUrl = (url = '') => (url ? `http://localhost:3000/${url}` : defaultPicture);

const PostingView = ({
  postings,
  addFavorite,
  favoritedPostings,
  uid,
}) => {
  const { postingId } = useParams();
  const posting = postings.filter(p => p.id.toString() === postingId)[0] || { picture: '' };
  console.log(postings);

  console.log('favopostings', favoritedPostings);
  console.log('postings', postings);
  console.log('postingId', postingId);
  console.log('posting', posting);
  console.log('uid', uid);

  const onFavoriteButtonClick = () => {
    addFavorite(posting.id);
  };

  const alreadyFavorited = () => {
    const fp = [...favoritedPostings];
    const m = fp.filter(p => p.favorites.some(f => (f.posting_id === posting.id)));
    return (m.length > 0);
  };

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
              <IconButton disabled={alreadyFavorited()} onClick={onFavoriteButtonClick}>
                { alreadyFavorited() ? <Favorite /> : <FavoriteOutlined /> }
              </IconButton>
            </div>
          </div>
          <div className={styles.postingDetailsItem}>
            <Typography variant="h4"> Description </Typography>
            <Typography variant="body1">
              { posting.description }
            </Typography>
          </div>
          <div className={styles.postingDetailsItem}>
            <Typography variant="h4"> Contact phone </Typography>
            <Typography variant="body1">
              { posting.contact_phone ? posting.contact_phone : 'Not specified' }
            </Typography>
          </div>
          <div className={styles.postingDetailsItem}>
            <Typography variant="h4"> Contact email </Typography>
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
