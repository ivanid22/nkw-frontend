import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LayoutContainer from '../../components/LayoutContainer/LayoutContainer';
import PostingsList from '../PostingsList/PostingsList';
import { postingsFavoritedByUser } from '../../filters/postings';

const FavoritesView = ({ postings }) => (
  <LayoutContainer>
    <PostingsList postings={postings} />
  </LayoutContainer>
);

FavoritesView.propTypes = {
  postings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  postings: postingsFavoritedByUser(state.applicationState.userProfile.id, state.postings),
});

export default connect(mapStateToProps)(FavoritesView);
