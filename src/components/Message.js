// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import ShareButton from './ShareButton';
import MessageMeta from './MessageMeta';
import Sticker from './Sticker';
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

type MessagePropTypes = {
  id: string,
  currentEntity: string | null,
  data: MessageType,
  loadingEntity: boolean,
  shareDisabled?: boolean,
  children?: any, // eslint-disable-line react/require-default-props
};

class Message extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    const {
      id,
      currentEntity,
      data,
      loadingEntity,
      children,
      ...other
    } = this.props;
    const {timestamp} = data;
    const { entity, author, stickers} = data.authorMessages;
    const { uri, name } = entity;
    const entityTracked = currentEntity !== null && currentEntity === uri;
    const { firstname, lastname } = author;
    const authorName = `${firstname} ${lastname}`.trim();

    return (
      <div>
        {stickers.map((sticker, i) => (
            <Sticker
                key={i}
                data={sticker}
                entity={entity}
            />
        ))}
      </div>
    );
  }
}

export default Message;
