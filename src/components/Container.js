// @flow
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: transparent;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
`;

export default Container;
