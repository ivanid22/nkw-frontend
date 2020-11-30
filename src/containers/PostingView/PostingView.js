import React from 'react';
import { startCreateFavorite } from '../../actions/postings';
import LayoutContainer from '../../components/LayoutContainer';
import styles from './PostingView.module.scss';
import defaultPicture from '../../assets/default-posting-picture.png';
import { Typography } from '@material-ui/core';
import { postingsFavoritedByUser } from '../../filters/postings'

const pictureUrl = posting => (posting.picture ? `http://localhost:3000/${posting.picture}` : defaultPicture);


const PostingView = ({ posting, addFavorite, favoritedPostings }) => {
  const onFavoriteButtonClick = event => {
    event.preventDefault();
    addFavorite(posting.id);
  };

  return (
    <LayoutContainer>
      <div className={styles.postingViewContainer}>
        <div className={styles.postingImageContainer}>
          <img src={pictureUrl(posting)} className={styles.postingImage} alt="Posting" />
        </div>
        <div className={styles.postingDetailsContainer}>
          <div className={styles.postingTitleContainer}>
            <Typography variant="h3">
              { posting.title }
            </Typography>
          </div>
        </div>
      </div>
    </LayoutContainer>
  )
}

const mapStateToProps = state => ({
  postings: state.postings,
  favoritedPostings: postingsFavoritedByUser(state.applicationState.userProfile.id, state.postings),
});

const mapDispatchToProps = dispatch => ({
  addFavorite: postingId => dispatch(startCreateFavorite(postingId)),
});
