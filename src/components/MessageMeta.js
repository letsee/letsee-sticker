// @flow
import React from 'react';
import styled from 'styled-components';
import type { User } from '../types';

const AuthorName = styled.div`
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: #fff;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
`;

const Timestamp = styled.div`
  margin-top: 2px;
  font-family: SFUIDisplay, sans-serif;
  font-size: 11px;
  text-align: center;
  color: #fff;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
`;

type MessageMetaPropTypes = {
  author: User,
  timestamp: number | string,
  children?: any, // eslint-disable-line react/require-default-props
};

const MessageMeta = ({
  author: {
    firstname,
    lastname,
  },
  timestamp,
  children,
  ...other
}: MessageMetaPropTypes) => {
  const date = new Date(Date.parse(`${timestamp}`));

  return (
    <div {...other}>
      <AuthorName>{`${firstname} ${lastname}`.trim()}</AuthorName>
      <Timestamp>{date.getFullYear()}년 {date.getMonth() + 1}월 {date.getDate()}일</Timestamp>
    </div>
  );
};

export default MessageMeta;
