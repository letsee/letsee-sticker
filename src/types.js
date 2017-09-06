// @flow
export type ShareModal = {
  messageId: string,
  authorName: string,
  entityName: string,
};

export type StickerPosition = {
  x: number,
  y: number,
  z: number,
};

export type StickerQuaternion = {
  x: number,
  y: number,
  z: number,
  w: number,
};

export type StickerRotation = {
  x: number,
  y: number,
  z: number,
};

export type StickerTypeEnum = 'Emoji' | 'Text';

export type Sticker = {
  id: string,
  position: StickerPosition,
  quaternion: StickerQuaternion,
  scale: number,
  text: string,
  type: StickerTypeEnum,
};

export type MessageAuthor = {
  id: string,
  firstname: string,
  lastname: string,
  uid: string,
};

export type MessageEntity = {
  id: string,
  image: string | null,
  name: string,
  uri: string,
};

export type Message = {
  id: string,
  author: MessageAuthor,
  entity: MessageEntity,
  public: boolean,
  stickers: Sticker[],
  timestamp: number | string;
};

export type MessageWithId = {
  id: string,
  author: MessageAuthor,
  entity: MessageEntity,
  public: boolean,
  stickers: Sticker[],
  timestamp: number,
};

export type News = {
  description: string,
  image: string,
  timestamp: number,
};

export type MessageFormSticker = {
  id: string,
  position: StickerPosition,
  quaternion: StickerQuaternion,
  scale: number,
  text: string,
  type: StickerTypeEnum,
};

export type MessageForm = {
  id: string | null,
  entity: MessageEntity,
  stickers: {
    byId: { [id: string]: MessageFormSticker },
    allIds: string[],
  },
  timestamp?: number,
  author: MessageAuthor,
  public: boolean,
  submitting: boolean,
  submitted: boolean,
  error: boolean,
};

export type MessagesList = {
  entityUri: string | null,
  public: boolean,
  empty: boolean,
  count: number,
  first: string | null,
  last: string | null,
  current: string | null,
  message: MessageWithId | null,
  error: boolean,
  loading: boolean,
};
