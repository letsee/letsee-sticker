// @flow
import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const AuthorName = styled.div`
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
`;

const Timestamp = styled.div`
  font-family: SFUIDisplay, sans-serif;
  font-size: 12px;
  color: #fff;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
`;

type MessageMetaPropTypes = {
  author: {
    firstname: string,
    lastname: string,
  },
  createdAt: string,
  children?: any,
};

const MessageMeta = ({
  author: {
    firstname,
    lastname,
  },
  createdAt,
  children,
  ...other
}: MessageMetaPropTypes) => (
  <div {...other}>
    <AuthorName>{`${firstname} ${lastname}`.trim()}</AuthorName>
    <Timestamp>{moment(createdAt, 'YYYYMMDDHHmmssZZ').format('YYYY년 M년 D일')}</Timestamp>
  </div>
);

export default MessageMeta;
