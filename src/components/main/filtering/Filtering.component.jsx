import React, { useState, useRef } from 'react';

import { style } from './Filtering.style';
import { Select } from 'antd';
import Button, {
  BUTTON_TYPE_CLASSES,
} from '../../common/ui/button/Button.component';

const Filtering = () => {
  const studyTypeNameRef = useRef();
  const studyDaysRef = useRef();
  const timeZoneRef = useRef();

  const studyTypeList = [
    'CS 지식',
    '알고리즘/자료구조',
    '기술면접',
    '백엔드',
    '프론트엔드',
    '모바일',
  ];

  const studyDaysList = ['미정', '주중', '주말'];

  const studyTimeZoneList = [
    '오전 (6:00 - 12:00)',
    '오후 (12:00 - 16:00)',
    '저녁 (18:00 - 24:00)',
  ];

  const { Option } = Select;

  // const [studyType, setStudyType] = useState();
  // const [studyDays, setStudyDays] = useState();
  // const [timeZone, setTimeZone] = useState();

  const submitHandler = async event => {
    event.preventDefault();

    const filtered = {
      studyTypeName: studyTypeNameRef.current.value,
      studyDays: studyDaysRef.current.value,
      timeZone: timeZoneRef.current.value,
    };
    // const filterStudy = {
    //   studyType: studyType || null,
    //   studyDays: studyDays || null,
    //   timeZone: timeZone || null,
    // };
    // console.log(filterStudy);
  };

  // const studyTypehandleChange = value => {
  //   setStudyType(value);
  // };

  // const studyDayshandleChange = value => {
  //   setStudyDays(value);
  // };

  // const timeZonehandleChange = value => {
  //   setTimeZone(value);
  // };

  return (
    <FilteringContainer>
      <FilteringBanner>
        <h2>저는 스터디를 찾고 있어요 &#128064;</h2>

        <SelectContainer>
          <Select
            ref={studyTypeNameRef}
            size="large"
            defaultValue="스터디 분야"
            style={{
              width: 200,
            }}
            onChange={studyTypehandleChange}
          >
            {studyTypeList.map(item => (
              <Option value={item} key={item}>
                {item}
              </Option>
            ))}
          </Select>
          <Select
            ref={studyDaysRef}
            size="large"
            defaultValue="스터디 요일"
            style={{
              width: 200,
            }}
            onChange={studyDayshandleChange}
          >
            {studyDaysList.map(item => (
              <Option value={item} key={item}>
                {item}
              </Option>
            ))}
          </Select>
          <Select
            ref={timeZoneRef}
            size="large"
            defaultValue="스터디 시간"
            style={{
              width: 220,
            }}
            onChange={timeZonehandleChange}
          >
            {studyTimeZoneList.map(item => (
              <Option value={item} key={item}>
                {item}
              </Option>
            ))}
          </Select>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.inverted}
            onClick={submitHandler}
          >
            Search
          </Button>
        </SelectContainer>
      </FilteringBanner>
    </FilteringContainer>
  );
};

export default Filtering;

const { FilteringContainer, FilteringBanner, SelectContainer } = style;
