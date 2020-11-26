import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import PropTypes from 'prop-types';
import PostingsListItem from '../PostingsListItem/PostingsListItem';
import styles from './PostingsList.module.scss';

const PostingsList = ({ postings }) => {
  const renderPostings = () => postings.map(posting => (
    <SwiperSlide key={posting.id}>
      <PostingsListItem posting={posting} />
    </SwiperSlide>
  ));

  return (
    <div className={styles.sliderContainer}>
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
