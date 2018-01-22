// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import ShareButton from './ShareButton';
import MessageMeta from './MessageMeta';
import ShareModal from '../ShareModal';
import Sticker from './Sticker';
import openCapture from '../../openCapture';
import openKakaoLink from '../../openKakaoLink';
import type { Message as MessageType } from '../../types';

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

type MessagePropTypes = {
  currentEntity: string | null,
  data: MessageType,
  loadingEntity: boolean,
  shareDisabled?: boolean,
  children?: any, // eslint-disable-line react/require-default-props
};

type MessageState = {
  shareModalOpened: boolean,
};

class Message extends Component<MessagePropTypes, MessageState> {
  static defaultProps = {
    shareDisabled: false,
  };

  state = {
    shareModalOpened: false,
  };

  render() {
    const {
      shareDisabled,
      currentEntity,
      data,
      loadingEntity,
      children,
      ...other
    } = this.props;

    const { id, entity, author, timestamp, stickers } = data;
    const { uri, name } = entity;
    const entityTracked = currentEntity !== null && currentEntity === uri;
    const { firstname, lastname } = author;
    const authorName = `${firstname} ${lastname}`.trim();
    const { shareModalOpened } = this.state;

    return (
      <div {...other}>
        {entityTracked && !loadingEntity && stickers.edges.map(({ node: sticker }) => (
          <Sticker
            key={sticker.id}
            data={sticker}
            entity={entity}
          />
        ))}

        {entityTracked && !loadingEntity && (
          <div>
            <StyledMessageMeta
              author={author}
              timestamp={timestamp}
            />

            <StyledShareButton
              onClick={shareDisabled ? null : () => this.setState({ shareModalOpened: true })}
            />
          </div>
        )}

        {shareModalOpened && (
          <ShareModal
            onClose={() => this.setState({ shareModalOpened: false })}
            onCaptureClick={() => {
              openCapture();
              this.setState({ shareModalOpened: false });
            }}
            onKakaoLinkClick={() => {
              openKakaoLink(id, authorName, name, {
                fail: (...args) => {
                  // TODO error
                  console.log(args);
                },
              });
            }}
          />
        )}
      </div>
    );
  }
}

export default Message;
