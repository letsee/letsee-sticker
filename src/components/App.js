// @flow
import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import './App.scss';

const Main = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

const App = ({ children }) => ( // eslint-disable-line react/prop-types
  <Main>
    <Helmet>
      <title>Sticker</title>
    </Helmet>

    {children}
  </Main>
);

export default App;
