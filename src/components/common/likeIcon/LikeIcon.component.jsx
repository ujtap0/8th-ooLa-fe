import React from 'react';
import { HeartFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';

const LikeIcon = ({ isLike }) => {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isLike ? (
        <HeartFilled style={{ fontSize: '2rem', color: '#dc143c' }} />
      ) : (
        <HeartFilled style={{ fontSize: '2rem', color: '#787878' }} />
      )}
    </>
  );
};

LikeIcon.propTypes = {
  isLike: PropTypes.bool,
};

export default LikeIcon;