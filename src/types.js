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

export type StickerEdge = {
  node: Sticker,
  cursor: string,
};

export type User = {
  id: string,
  firstname: string,
  lastname: string,
  uid: string,
};

export type Entity = {
  id: string,
  image: string | null,
  name: string,
  uri: string,
};

export type PageInfo = {
  hasNextPage: boolean,
  hasPreviousPage: boolean,
  startCursor: string | null,
  endCursor: string | null,
};

export type StickerConnection = {
  pageInfo: PageInfo,
  edges: StickerEdge[],
  count: number,
};

export type Message = {
  id: string,
  author: User,
  entity: Entity,
  public: boolean,
  stickers: StickerConnection,
  timestamp: number | string;
};

export type MessageEdge = {
  node: Message,
  cursor: string,
};

export type MessageConnection = {
  pageInfo: PageInfo,
  edges: MessageEdge[],
  count: number,
};

export type News = {
  description: string,
  image: string,
  timestamp: number,
};

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
