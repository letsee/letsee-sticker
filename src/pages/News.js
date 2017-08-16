// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
} from 'react-redux-firebase';
import NewsList from '../components/NewsList';

const News = ({
  data,
  router,
}) => (
  <NewsList
    loading={!isLoaded(data)}
    empty={isEmpty(data)}
    data={data}
    onClose={() => router.push(process.env.PUBLIC_PATH || '/')}
  />
);

export default firebaseConnect([{
  path: 'news',
  storeAs: 'news',
  queryParams: ['orderByChild=timestamp'],
}])(connect(({ firebase: { data: { news } } }) => ({ data: news }))(News));