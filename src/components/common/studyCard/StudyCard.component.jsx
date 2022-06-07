import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'antd';
import LikeIcon from '../likeIcon/LikeIcon.component';
import PropTypes from 'prop-types';
import {
  StyledCard,
  StudyTitle,
  ConditionContaier,
  TagContainer,
  TeamOutlinedIcon,
  StudyCardHeader,
} from './StudyCard.style';
import StudyTag from '../studyTag/StudyTag.component';

const StudyCard = ({ study }) => {
  const {
    likeStatus,
    studyName,
    startDate,
    participants,
    currentParticipants,
    studyDays,
    studyTimezone,
    studyType,
  } = study;
  return (
    <Col span={8}>
      <Link to="/studyDetails/1">
        <StyledCard bodyStyle={{ paddingBottom: '16px' }}>
          <StudyCardHeader>
            <LikeIcon isLike={likeStatus} />
          </StudyCardHeader>
          <StudyTitle>{studyName}</StudyTitle>
          <TagContainer>
            <StudyTag content={studyType} type="studyType" />
            <StudyTag content={studyDays} type="studyDays" />
            <StudyTag content={studyTimezone} type="studyTimezone" />
          </TagContainer>
          <ConditionContaier>
            <span>{`시작예정일 | ${startDate}`}</span>
            <span>
              <TeamOutlinedIcon />
              {` | ${currentParticipants}/${participants}`}
            </span>
          </ConditionContaier>
        </StyledCard>
      </Link>
    </Col>
  );
};

StudyCard.propTypes = {
  study: PropTypes.shape({
    likeStatus: PropTypes.bool,
    studyName: PropTypes.string,
    startDate: PropTypes.string,
    participants: PropTypes.number,
    currentParticipants: PropTypes.number,
    studyType: PropTypes.string,
  }),
};

export default StudyCard;