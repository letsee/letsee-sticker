// @flow
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
  timestamp: number;
};

export type News = {
  description: string,
  image: string,
  timestamp: number,
};
