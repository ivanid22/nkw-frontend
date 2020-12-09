import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LayoutContainer from '../../components/LayoutContainer/LayoutContainer';
import PostingsList from '../PostingsList/PostingsList';
import { postingsByUser } from '../../filters/postings';

const UserPostingsView = ({ postings }) => (
  <LayoutContainer>
    <PostingsList postings={postings} />
  </LayoutContainer>
);

UserPostingsView.propTypes = {
  postings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  postings: postingsByUser(state.applicationState.userProfile.id, state.postings),
});

export default connect(mapStateToProps)(UserPostingsView);
