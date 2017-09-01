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

export type StickerType = 'emoji' | 'text';

export type Sticker = {
  position: StickerPosition,
  quaternion: StickerQuaternion,
  scale: number,
  text: string,
  type: StickerType,
};

export type MessageAuthor = {
  firstname: string,
  lastname: string,
  uid: string,
};

export type MessageEntity = {
  image: string,
  name: string,
  uri: string,
};

export type Message = {
  author: MessageAuthor,
  entity: MessageEntity,
  public: boolean,
  stickers: Sticker[],
  timestamp: number;
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

export type MessageFormEntity = {
  uri: string,
  name: string,
  image: string,
  size: {
    width: number,
    height: number,
    depth: number,
  },
};

export type MessageFormSticker = {
  id: string,
  position: StickerPosition,
  quaternion: StickerQuaternion,
  scale: number,
  text: string,
  type: StickerType,
};

export type MessageForm = {
  id: string | null,
  entity: MessageFormEntity,
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
  entityUri: string,
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
