import React from 'react';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Typography } from '@material-ui/core';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import PropTypes from 'prop-types';
import PostingsListItem from '../PostingsListItem/PostingsListItem';
import styles from './PostingsList.module.scss';

SwiperCore.use([Navigation]);

const PostingsList = ({ postings }) => {
  const renderPostings = () => postings.map(posting => (
    <SwiperSlide key={posting.id}>
      <PostingsListItem posting={posting} />
    </SwiperSlide>
  ));

  const EmptyList = () => (
    <SwiperSlide>
      <Typography variant="h4">
        No elements present in this list
      </Typography>
    </SwiperSlide>
  );

  return (
    <div className={styles.sliderContainer}>
      <Swiper
        spaceBetween={10}
        navigation
      >
        { (postings.length > 0) ? renderPostings() : <EmptyList /> }
      </Swiper>
    </div>
  );
};

PostingsList.propTypes = {
  postings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostingsList;
