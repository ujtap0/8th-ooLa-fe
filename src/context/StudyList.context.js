/* eslint-disable no-sequences */
/* eslint-disable prettier/prettier */
import React, { createContext, useState, useEffect, useRef } from 'react';
import { getStudyList, getStudyFilter } from '../lib/apis/main';

export const StudyListContext = createContext();

export const StudyListProvider = ({ children }) => {
  const pageNum = useRef(0);
  const [isLast, setIsLast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [studies, setStudies] = useState([]);
  const [filterValue, setFilterValue] = useState({});
  const [isFilteringStart, setIsFilteringStart] = useState(false);

  async function getStudyFiltering(pageNum, filterValue) {
    const response = await getStudyFilter(pageNum, 15, filterValue);
    setIsLast(response.last);
    const content = response.content;
    return content;
  }

  async function fetchStudyFiltering(pageNum) {
    setIsLoading(true);
    const newStudies = await getStudyFiltering(pageNum, filterValue);
    setStudies(prev => [...prev, ...newStudies]);
    setIsLoading(false);
  }

  useEffect(() => {
    if (isFilteringStart) {
      pageNum.current = 0;
      setStudies([]);
    }
  }, [isFilteringStart]);

  const value = {
    isLast,
    isLoading,
    isFilteringStart,
    studies,
    pageNum,
    setFilterValue,
    fetchStudyFiltering,
    setIsFilteringStart,
  };

  return (
    <StudyListContext.Provider value={value}>
      {children}
    </StudyListContext.Provider>
  );
};