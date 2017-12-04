// @flow
import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import size from 'lodash.size';
import sortBy from 'lodash.sortby';
import keys from 'lodash.keys';
import NewsList from '../components/NewsList';
import type { News as NewsType } from '../types';

const PER_PAGE = 10;

type NewsState = {
  loading: boolean,
  startCursor: number | null,
  endCursor: number | null,
  hasNextPage: boolean,
  data: { [key: string]: NewsType },
  error: boolean,
};

class News extends Component<any, NewsState> {
  state = {
    loading: false,
    startCursor: null,
    endCursor: null,
    hasNextPage: false,
    data: {},
    error: false,
  };

  componentWillMount() {
    this.setState({ loading: true }, () => {
      const ref = this.props.firebase.database().ref('news').orderByChild('timestamp');

      ref.on('child_removed', this.handleChildRemoved);
      ref.on('child_changed', this.handleChildChanged);

      ref.limitToLast(PER_PAGE + 1).once('value', (snapshot) => {
        const data = snapshot.val();
        const dataSize = size(data);
        let endCursor = null;
        let startCursor = null;

        if (dataSize > 0) {
          const sortedKeys = sortBy(keys(data), id => data[id].timestamp);
          const endCursorKey = sortedKeys[0];
          const startCursorKey = sortedKeys[dataSize - 1];
          endCursor = data[endCursorKey].timestamp;
          startCursor = data[startCursorKey].timestamp;
        }

        const hasNextPage = dataSize === PER_PAGE + 1;

        this.setState(prevState => ({
          data: {
            ...prevState.data,
            ...data,
          },
          startCursor,
          endCursor,
          hasNextPage,
          loading: false,
          error: false,
        }), () => {
          ref.startAt(this.state.startCursor).on('child_added', (childSnapshot) => {
            this.setState(prevState => ({
              data: {
                ...prevState.data,
                [childSnapshot.key]: childSnapshot.val(),
              },
              error: false,
            }));
          });
        });
      }, (e) => {
        // TODO error
        console.log(e);

        this.setState({
          loading: false,
          error: true,
        });
      });
    });
  }

  componentWillUnmount() {
    const ref = this.props.firebase.database().ref('news').orderByChild('timestamp');
    ref.off('child_removed', this.handleChildRemoved);
    ref.off('child_changed', this.handleChildChanged);
  }

  handleChildRemoved = (oldChildSnapshopt) => {
    this.setState((prevState) => {
      const {
        [oldChildSnapshopt.key]: old,
        ...data
      } = prevState.data;

      return { data };
    });
  };

  handleChildChanged = (childSnapshot) => {
    if (this.state.data[childSnapshot.key]) {
      this.setState(prevState => ({
        data: {
          ...prevState.data,
          [childSnapshot.key]: childSnapshot.val(),
        },
      }));
    }
  };

  fetchData() {
    if (this.state.hasNextPage) {
      this.setState({ loading: true }, () => {
        const ref = this.props.firebase.database().ref('news').orderByChild('timestamp');

        ref.endAt(this.state.endCursor).limitToLast(PER_PAGE + 1).once('value', (snapshot) => {
          const data = snapshot.val();
          const dataSize = size(data);
          let endCursor = null;

          if (dataSize > 0) {
            const cursorKey = sortBy(keys(data), id => data[id].timestamp)[0];
            endCursor = data[cursorKey].timestamp;
          }

          const hasNextPage = dataSize === PER_PAGE + 1;

          this.setState(prevState => ({
            data: {
              ...prevState.data,
              ...data,
            },
            endCursor,
            hasNextPage,
            error: false,
            loading: false,
          }));
        }, (e) => {
          // TODO error
          console.log(e);

          this.setState({
            loading: false,
            error: true,
          });
        });
      });
    }
  }

  render() {
    const { loading, error, data, hasNextPage } = this.state;

    return (
      <NewsList
        loading={loading}
        empty={size(data) === 0}
        error={error}
        data={data}
        hasNextPage={hasNextPage}
        onWaypointEnter={() => this.fetchData()}
        onClose={() => this.props.router.push(process.env.PUBLIC_PATH || '/')}
      />
    );
  }
}

export default firebaseConnect()(News);
