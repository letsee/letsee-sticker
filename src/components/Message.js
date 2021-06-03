// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import ShareButton from './ShareButton';
import MessageMeta from './MessageMeta';
import ShareModal from './ShareModal';
import Sticker from './Sticker';
import openCapture from '../openCapture';
import openKakaoLink from '../openKakaoLink';
import store from '../store';
import type { Message as MessageType } from '../types';

const StyledMessageMeta = styled(MessageMeta)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 11px;
`;

const StyledShareButton = styled(ShareButton)`
  position: absolute;
  right: 5px;
  top: 30px;
`;

const StyledShareButton2 = styled(StyledShareButton)`
  position: absolute;
  right: 5px;
  top: 30px;
`;

type MessagePropTypes = {
  id: string,
  currentEntity: string | null,
  data: MessageType,
  loadingEntity: boolean,
  shareModalOpened?: boolean,
  children?: any, // eslint-disable-line react/require-default-props
};

class Message extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    shareModalOpened: false,
    urlCopy:false,
  };

  state: {
    shareModalOpened: boolean,
    urlCopy:boolean
  };



  props: MessagePropTypes;

  render() {
    const {
      id,
      shareDisabled,
      currentEntity,
      data,
      children,
      ...other
    } = this.props;
    // const {timestamp} = data;
    const { entity, author, stickers} = data.authorMessages;
    console.log('stickers', stickers);
    const { uri, name } = entity;
    // const entityTracked = currentEntity !== null && currentEntity === uri;
    const loadingEntity = store.getState().loadingEntity;
    const { firstname, lastname } = author;
    const authorName = `${firstname} ${lastname}`.trim();
    const { shareModalOpened, urlCopy } = this.state;
    const link = 'https://'+ location.host + (location.pathname ? location.pathname : '' ) + '#/' + data._id;
    return (
        <div>
          {loadingEntity &&  stickers.map((sticker, i) => (
              <Sticker
                  key={i}
                  data={sticker}
                  entity={entity}
              />
          ))}

          {loadingEntity  &&  (
              <div>
                {/*메타 데이터 제거*/}
                {/*<StyledMessageMeta*/}
                {/*  author={author}*/}
                {/*  timestamp={timestamp}*/}
                {/*/>*/}

                <StyledShareButton
                    onClick={shareDisabled ? null : () => this.setState({ shareModalOpened: true })}
                />
              </div>
          )}

          {shareModalOpened &&(
              <ShareModal
                  onClose={() => {this.setState({ shareModalOpened: false , urlCopy:false })}}
                  onCaptureClick={() => {
                   openCapture();
                    this.setState({ shareModalOpened: false });
                  }}
                  onKakaoLinkClick={() => {
                    this.setState({urlCopy : true});
                  }}
                  urlCopy={this.state.urlCopy}
                  link={link}
              />
          )}
        </div>
    );
  }
}

export default Message;
