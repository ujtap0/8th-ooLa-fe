import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import { style } from './EditStudyInfoForm.style';
import PropTypes from 'prop-types';
import UseStudyInput from '../../../hooks/useStudyInput';
import { fetchStudyInfo, updateStudyInfo } from '../../../lib/apis/updateStudy';

const isUpdate = value => value.trim() === '' || value.trim() !== '';
const isUpdateUrl = value => value.includes('https://open.kakao.com/');

const EditStudyInfoForm = () => {
  const navigate = useNavigate();

  const studyTypeList = [
    'CS 지식',
    '알고리즘/자료구조',
    '기술면접',
    '백엔드',
    '프론트엔드',
    '모바일',
  ];

  const studyDaysList = ['미정', '주중', '주말'];

  const timeZoneList = [
    '미정',
    '오전 (6:00 - 12:00)',
    '오후 (12:00 - 16:00)',
    '저녁 (18:00 - 24:00)',
  ];

  const { TextArea } = Input;

  const {
    value: studyTypeValue,
    isValid: studyTypeIsValid,
    hasError: studyTypeHasError,
    valueChangeHandler: studyTypeChangeHandler,
    inputBlurHandler: studyTypeBlurHandler,
    reset: resetStudyTypeInput,
  } = UseStudyInput(isUpdate);

  const {
    value: studyNameValue,
    isValid: studyNameIsValid,
    hasError: studyNameHasError,
    valueChangeHandler: studyNameChangeHandler,
    inputBlurHandler: studyNameBlurHandler,
    reset: resetStudyNameInput,
  } = UseStudyInput(isUpdate);

  const {
    value: studyDaysValue,
    isValid: studyDaysIsValid,
    hasError: studyDaysHasError,
    valueChangeHandler: studyDaysChangeHandler,
    inputBlurHandler: studyDaysBlurHandler,
    reset: resetStudyDaysInput,
  } = UseStudyInput(isUpdate);

  const {
    value: timeZoneValue,
    isValid: timeZoneIsValid,
    hasError: timeZoneHasError,
    valueChangeHandler: timeZoneChangeHandler,
    inputBlurHandler: timeZoneBlurHandler,
    reset: resetTimeZoneInput,
  } = UseStudyInput(isUpdate);

  const {
    value: startDateValue,
    isValid: startDateIsValid,
    hasError: startDateHasError,
    valueChangeHandler: startDateChangeHandler,
    inputBlurHandler: startDateBlurHandler,
    reset: resetStartDateInput,
  } = UseStudyInput(isUpdate);

  const {
    value: endDateValue,
    isValid: endDateIsValid,
    hasError: endDateHasError,
    valueChangeHandler: endDateChangeHandler,
    inputBlurHandler: endDateBlurHandler,
    reset: resetEndDateInput,
  } = UseStudyInput(isUpdate);

  const {
    value: openChatUrlValue,
    isValid: openChatUrlIsValid,
    hasError: openChatUrlHasError,
    valueChangeHandler: openChatUrlChangeHandler,
    inputBlurHandler: openChatUrlBlurHandler,
    reset: resetOpenChatUrlInput,
  } = UseStudyInput(isUpdateUrl || isUpdate);

  const {
    value: participantsValue,
    isValid: participantsIsValid,
    hasError: participantsHasError,
    valueChangeHandler: participantsChangeHandler,
    inputBlurHandler: participantsBlurHandler,
    reset: resetParticipantsInput,
  } = UseStudyInput(isUpdate);

  const {
    value: studyIntroduceValue,
    isValid: studyIntroduceIsValid,
    hasError: studyIntroduceHasError,
    valueChangeHandler: studyIntroduceChangeHandler,
    inputBlurHandler: studyIntroduceBlurHandler,
    reset: resetStudyIntroduceInput,
  } = UseStudyInput(isUpdate);

  const {
    value: studyGoalValue,
    isValid: studyGoalIsValid,
    hasError: studyGoalHasError,
    valueChangeHandler: studyGoalChangeHandler,
    inputBlurHandler: studyGoalBlurHandler,
    reset: resetStudyGoalInput,
  } = UseStudyInput(isUpdate);

  let formIsValid = true;

  if (
    studyTypeIsValid &&
    studyNameIsValid &&
    openChatUrlIsValid &&
    studyDaysIsValid &&
    timeZoneIsValid &&
    startDateIsValid &&
    endDateIsValid &&
    participantsIsValid &&
    studyIntroduceIsValid &&
    studyGoalIsValid
  ) {
    formIsValid = true;
  }

  const submitUpdateHandler = async event => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const submitEditStudy = {
      studyId: studyId,
      role: role,
      currentParticipants: currentParticipants,
      studyType: studyTypeValue || studyType,
      studyName: studyNameValue || studyName,
      openChatUrl: openChatUrlValue || openChatUrl,
      studyDays: studyDaysValue || studyDays,
      timeZone: timeZoneValue || timeZone,
      startDate: new Date(startDateValue || startDate)
        .toISOString()
        .replace('T', ' ')
        .replace(/\..*/, ''),
      endDate: new Date(endDateValue || endDate)
        .toISOString()
        .replace('T', ' ')
        .replace(/\..*/, ''),
      participants: Number(participantsValue || participants),
      studyIntroduce: studyIntroduceValue || studyIntroduce,
      studyGoal: studyGoalValue || studyGoal,
    };

    console.log(submitEditStudy);

    const res = await updateStudyInfo(submitEditStudy);
    if (res.status === 201) {
      const studyId = res.data.studyId;
      navigate(`studyDetails/${studyId}`);
    }

    resetStudyTypeInput();
    resetStudyNameInput();
    resetOpenChatUrlInput();
    resetStudyDaysInput();
    resetTimeZoneInput();
    resetStartDateInput();
    resetEndDateInput();
    resetParticipantsInput();
    resetStudyIntroduceInput();
    resetStudyGoalInput();
  };

  const studyTypeClasses = studyTypeHasError
    ? 'form-control invalid'
    : 'form-control';

  const studyNameClasses = studyNameHasError
    ? 'form-control invalid'
    : 'form-control';

  const openChatUrlClasses = openChatUrlHasError
    ? 'form-control invalid'
    : 'form-control';

  const studyDaysClasses = studyDaysHasError
    ? 'form-control invalid'
    : 'form-control';

  const timeZoneClasses = timeZoneHasError
    ? 'form-control invalid'
    : 'form-control';

  const startDateClasses = startDateHasError
    ? 'form-control invalid'
    : 'form-control';

  const endDateClasses = endDateHasError
    ? 'form-control invalid'
    : 'form-control';

  const participantsClasses = participantsHasError
    ? 'form-control invalid'
    : 'form-control';

  const studyIntroduceClasses = studyIntroduceHasError
    ? 'form-control invalid'
    : 'form-control';

  const studyGoalClasses = studyGoalHasError
    ? 'form-control invalid'
    : 'form-control';

  const [studyId, setStudyId] = useState('');
  const [role, setRole] = useState('');
  const [studyType, setStudyType] = useState('');
  const [studyName, setStudyName] = useState('');
  const [studyDays, setStudyDays] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [participants, setParticipants] = useState('');
  const [currentParticipants, setCurrentParticipants] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [openChatUrl, setOpenChatUrl] = useState('');
  const [studyIntroduce, setStudyIntroduce] = useState('');
  const [studyGoal, setStudyGoal] = useState('');

  useEffect(() => {
    const getStudyInfo = async () => {
      const response = await fetchStudyInfo();
      const data = response.data;
      setStudyId(data.studyId);
      setRole(data.role);
      setStudyType(data.studyType);
      setStudyName(data.studyName);
      setStudyDays(data.studyDays);
      setTimeZone(data.timeZone);
      setParticipants(data.participants);
      setCurrentParticipants(data.currentParticipants);
      setStartDate(data.startDate);
      setEndDate(data.endDate);
      setOpenChatUrl(data.openChatUrl);
      setStudyIntroduce(data.studyIntroduce);
      setStudyGoal(data.studyGoal);
    };
    getStudyInfo();
  }, []);

  // db.json Test

  // useEffect(() => {
  //   const getStudyInfo = async () => {
  //     const response = await fetchStudyInfo();
  //     const res = response.data;
  //     setStudyName(res[0].studyName);
  //     setStudyType(res[0].studyType);
  //     setStudyDays(res[0].studyDays);
  //     setTimeZone(res[0].timeZone);
  //     setParticipants(res[0].participants);
  //     setStartDate(res[0].startDate);
  //     setEndDate(res[0].endDate);
  //     setOpenChatUrl(res[0].openChatUrl);
  //     setStudyIntroduce(res[0].studyIntroduce);
  //     setStudyGoal(res[0].studyGoal);
  //   };
  //   getStudyInfo();
  // }, []);

  return (
    <form onSubmit={submitUpdateHandler}>
      <InputFormContainer>
        <StudyTypeInputField className={studyTypeClasses}>
          <h4>스터디분야</h4>
          <select
            value={studyTypeValue || studyType}
            onChange={studyTypeChangeHandler}
            onBlur={studyTypeBlurHandler}
          >
            <option className="optionNull">
              스터디
              분야&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▾
            </option>
            {studyTypeList.map(item => (
              <option className="option" value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          {studyTypeHasError && <p>스터디 분야를 선택해주세요</p>}
        </StudyTypeInputField>

        <StudyNameInputField className={studyNameClasses}>
          <h4>스터디 이름</h4>
          <Input
            className="input"
            value={studyNameValue || ` ${studyName}`}
            onChange={studyNameChangeHandler}
            onBlur={studyNameBlurHandler}
            type="text"
            maxLength={16}
            placeholder="스터디 이름을 입력해주세요"
          />
          {studyNameHasError && <p>스터디 이름을 입력해주세요</p>}
        </StudyNameInputField>

        <StudyScheduleInputField>
          <h4>스터디 일정 및 시간</h4>
          <div className="selectContainer">
            <div className={studyDaysClasses}>
              <select
                value={studyDaysValue || studyDays}
                onChange={studyDaysChangeHandler}
                onBlur={studyDaysBlurHandler}
              >
                <option className="optionNull">
                  스터디
                  요일&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▾
                </option>
                {studyDaysList.map(item => (
                  <option className="option" value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              {studyDaysHasError && <p>스터디 요일을 선택해주세요</p>}
            </div>

            <div className={timeZoneClasses}>
              <select
                value={timeZoneValue || timeZone}
                onChange={timeZoneChangeHandler}
                onBlur={timeZoneBlurHandler}
              >
                <option className="optionNull">
                  스터디
                  시간&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▾
                </option>
                {timeZoneList.map(item => (
                  <option className="option" value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              {timeZoneHasError && <p>스터디 시간을 선택해주세요</p>}
            </div>
          </div>
        </StudyScheduleInputField>

        <ParticipantsInputField className={participantsClasses}>
          <h4>스터디 모집 인원</h4>
          <Input
            className="input"
            value={participantsValue || participants}
            onChange={participantsChangeHandler}
            onBlur={participantsBlurHandler}
            min="2"
            max="30"
            placeholder="ex.5"
            type="number"
          />
          {participantsHasError && (
            <p>스터디 모집 인원(30명 이하)을 입력해주세요</p>
          )}
        </ParticipantsInputField>

        <StudyDateInputField>
          <div className={startDateClasses}>
            <h4>스터디 시작일</h4>
            <input
              className="inputDate"
              value={startDateValue || startDate}
              onChange={startDateChangeHandler}
              onBlur={startDateBlurHandler}
              type="date"
            />
            {startDateHasError && <p>스터디 시작일을 선택해주세요</p>}
          </div>
          <div className={endDateClasses}>
            <h4>스터디 종료일</h4>
            <input
              className="inputDate"
              type="date"
              value={endDateValue || endDate}
              onChange={endDateChangeHandler}
              onBlur={endDateBlurHandler}
            />
            {endDateHasError && <p>스터디 종료일을 선택해주세요</p>}
          </div>
        </StudyDateInputField>

        <OpenChatUrlInputField className={openChatUrlClasses}>
          <h4>카카오 오픈 채팅방</h4>
          <Input
            className="input"
            placeholder="ex.https://open.kakao.com/o/ooLa5la"
            value={openChatUrlValue || ` ${openChatUrl}`}
            onChange={openChatUrlChangeHandler}
            onBlur={openChatUrlBlurHandler}
          />
          {openChatUrlHasError && <p>카카오 오픈 채팅방 URL을 입력해주세요</p>}
        </OpenChatUrlInputField>

        <StudyIntroduceInputField className={studyIntroduceClasses}>
          <h4>스터디 소개</h4>
          <TextArea
            className="input"
            size="large"
            rows={8}
            placeholder="스터디 소개 및 구체적인 일정 및 시간을 입력해주세요"
            minLength={20}
            value={studyIntroduceValue || ` ${studyIntroduce}`}
            onChange={studyIntroduceChangeHandler}
            onBlur={studyIntroduceBlurHandler}
          />
          {studyIntroduceHasError && <p>스터디 소개를 입력해주세요</p>}
        </StudyIntroduceInputField>

        <StudyGoalInputField className={studyGoalClasses}>
          <h4>스터디 목표</h4>
          <TextArea
            className="input"
            size="large"
            rows={8}
            placeholder="스터디 목표를 입력해주세요"
            minLength={20}
            value={studyGoalValue || ` ${studyGoal}`}
            onChange={studyGoalChangeHandler}
            onBlur={studyGoalBlurHandler}
          />
          {studyGoalHasError && <p>스터디 목표를 입력해주세요</p>}
        </StudyGoalInputField>

        <StyledButton
          disabled={!formIsValid}
          type="submit"
          onChange={submitUpdateHandler}
        >
          완료
        </StyledButton>
      </InputFormContainer>
    </form>
  );
};

export default EditStudyInfoForm;

const {
  InputFormContainer,
  StudyTypeInputField,
  StudyNameInputField,
  StudyScheduleInputField,
  ParticipantsInputField,
  StudyDateInputField,
  OpenChatUrlInputField,
  StudyIntroduceInputField,
  StudyGoalInputField,
  StyledButton,
} = style;

EditStudyInfoForm.propTypes = {
  studyType: PropTypes.string,
  studyName: PropTypes.string,
  studyDays: PropTypes.string,
  timeZone: PropTypes.string,
  participants: PropTypes.number,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  openChatUrl: PropTypes.string,
  studyIntroduce: PropTypes.string,
  studyGoal: PropTypes.string,
};