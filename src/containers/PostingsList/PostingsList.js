import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';
import PostingsListItem from '../PostingsListItem/PostingsListItem';

const PostingsList = ({ postings }) => {
  const renderPostings = () => postings.map(posting => (
    <SwiperSlide key={posting.id}>
      <PostingsListItem posting={posting} />
    </SwiperSlide>
  ));

  return (
    <div>
      <Swiper>
        { renderPostings() }
      </Swiper>
    </div>
  );
};

PostingsList.propTypes = {
  postings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostingsList;
