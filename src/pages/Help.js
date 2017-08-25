// @flow
import React from 'react';
import HelpComponent from '../components/Help';

const Help = ({
  router,
}) => (
  <HelpComponent onCloseClick={() => router.goBack()} />
);

export default Help;
