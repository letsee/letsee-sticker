// @flow
import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import { Helmet } from 'react-helmet';

injectGlobal`
  html {
    position: relative;
  }

  body {
    margin: 0;
    font-family: AppleSDGothicNeo, sans-serif;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

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
