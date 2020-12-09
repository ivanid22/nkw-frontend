import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LayoutContainer from '../../components/LayoutContainer/LayoutContainer';
import PostingsList from '../PostingsList/PostingsList';

const PostingsView = ({ postings }) => (
  <LayoutContainer>
    <PostingsList postings={postings} />
  </LayoutContainer>
);

PostingsView.propTypes = {
  postings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  postings: state.postings,
});

export default connect(mapStateToProps)(PostingsView);
