// @flow
import React from 'react';
import HelpComponent from '../components/Help';

const Help = ({
  router,
}) => (
  <HelpComponent onCloseClick={() => router.push(process.env.PUBLIC_PATH || '/')} />
);

export default Help;
