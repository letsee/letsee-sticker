// @flow
import PropTypes from 'prop-types';

export type StickerPosition = {
  x: number,
  y: number,
  z: number,
};

export const StickerPositionProp = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  z: PropTypes.number.isRequired,
});

export type StickerQuaternion = {
  x: number,
  y: number,
  z: number,
  w: number,
};

export const StickerQuaternionProp = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  z: PropTypes.number.isRequired,
});

export type StickerRotation = {
  x: number,
  y: number,
  z: number,
};

export const StickerRotationProp = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  z: PropTypes.number.isRequired,
});


export type StickerTypeEnum = 'Emoji' | 'Text';
export const StickerTypeProp = PropTypes.oneOf(['Emoji', 'Text']);

export type Sticker = {
  id: string,
  position: StickerPosition,
  quaternion: StickerQuaternion,
  scale: number,
  text: string,
  type: StickerTypeEnum,
};

export const StickerProp = PropTypes.shape({
  id: PropTypes.string.isRequired,
  position: StickerPositionProp.isRequired,
  quaternion: StickerQuaternionProp.isRequired,
  scale: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  type: StickerTypeProp.isRequired,
});

export type StickerEdge = {
  node: Sticker,
  cursor: string,
};

export const StickerEdgeProp = PropTypes.shape({
  node: StickerProp.isRequired,
  cursor: PropTypes.string.isRequired,
});

export type User = {
  id: string,
  firstname: string,
  lastname: string,
  uid: string,
};

export const UserProp = PropTypes.shape({
  id: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export type Entity = {
  id: string,
  image: string | null,
  name: string,
  uri: string,
};

export const EntityProp = PropTypes.shape({
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
});

export type PageInfo = {
  hasNextPage: boolean,
  hasPreviousPage: boolean,
  startCursor: string | null,
  endCursor: string | null,
};

export const PageInfoProp = PropTypes.shape({
  hasNextPage: PropTypes.bool.isRequired,
  hasPreviousPage: PropTypes.bool.isRequired,
  startCursor: PropTypes.string,
  endCursor: PropTypes.string,
});

export type StickerConnection = {
  pageInfo: PageInfo,
  edges: StickerEdge[],
  count: number,
};

export const StickerConnectionProp = PropTypes.shape({
  pageInfo: PageInfoProp.isRequired,
  edges: PropTypes.arrayOf(StickerEdgeProp.isRequired).isRequired,
  count: PropTypes.number.isRequired,
});

export type Message = {
  id: string,
  author: User,
  entity: Entity,
  public: boolean,
  stickers: StickerConnection,
  timestamp: number | string;
};

export const MessageProp = PropTypes.shape({
  id: PropTypes.string.isRequired,
  author: UserProp.isRequired,
  entity: EntityProp.isRequired,
  public: PropTypes.bool.isRequired,
  stickers: StickerConnectionProp.isRequired,
  timestamp: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.string.isRequired]).isRequired,
});

export type MessageEdge = {
  node: Message,
  cursor: string,
};

export const MessageEdgeProp = PropTypes.shape({
  node: MessageProp.isRequired,
  cursor: PropTypes.string.isRequired,
});

export type MessageConnection = {
  pageInfo: PageInfo,
  edges: MessageEdge[],
  count: number,
};

export const MessageConnectionProp = PropTypes.shape({
  pageInfo: PageInfoProp.isRequired,
  edges: PropTypes.arrayOf(MessageEdgeProp.isRequired).isRequired,
  count: PropTypes.number.isRequired,
});

export type News = {
  description: string,
  image: string,
  timestamp: number,
};

export const NewsProp = PropTypes.shape({
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
});

export type MessageForm = {
  id: string | null,
  entity: Entity,
  stickers: {
    byId: { [id: string]: Sticker },
    allIds: string[],
  },
  timestamp?: number,
  author: User,
  public: boolean,
  submitting: boolean,
  submitted: boolean,
  error: boolean,
};

export const MessageFormProp = PropTypes.shape({
  id: PropTypes.string,
  entity: EntityProp.isRequired,
  stickers: PropTypes.shape({
    byId: PropTypes.objectOf(StickerProp.isRequired).isRequired,
    allIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
  timestamp: PropTypes.number,
  author: UserProp.isRequired,
  public: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitted: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
});
