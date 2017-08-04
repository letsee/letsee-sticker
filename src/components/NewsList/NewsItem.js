// @flow
import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Container = styled.div`
  zoom: 1;
  overflow: hidden;
  padding: 12px;
  border-bottom: 0.5px solid #e9e9e9;
`;

const ImageContainer = styled.div`
  display: table-cell;
  vertical-align: top;
  box-sizing: border-box;
  padding-right: 14px;
`;

const Image = styled.img`
  width: 54px;
  height: 54px;
  object-fit: contain;
  display: block;
`;

const Message = styled.div`
  zoom: 1;
  overflow: hidden;
  display: table-cell;
  vertical-align: middle;
  font-family: AppleSDGothicNeo, sans-serif;
  font-size: 15px;
  letter-spacing: -0.2px;
  color: #000;
  word-wrap: break-word;
`;

const NewsItem = ({
  data: { image, description, timestamp },
  children,
  ...other
}) => (
  <Container {...other}>
    <ImageContainer>
      <Image src={image} />
    </ImageContainer>

    <Message>
      <div>{moment(timestamp).format('YYYY. M. D.')}</div>
      <div>{description}</div>
    </Message>
  </Container>
);

export const Banner = styled(NewsItem)`
  background-color: #fff;
  border-radius: 6px;
  border-bottom: 0;
  position: absolute;
  left: 5px;
  right: 5px;
  bottom: 5px;
  cursor: pointer;
`;

export default NewsItem;
