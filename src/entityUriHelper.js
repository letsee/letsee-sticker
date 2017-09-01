// @flow
const ENTITY_URI_REGEX = /https?:\/\/d\.letsee\.io\/(.+)/;

export const entityUriToId = (uri: string): string => {
  const m = uri.match(ENTITY_URI_REGEX);

  if (m) {
    return m[1];
  }

  return uri;
};

export const entityIdToUri = (id: string): string => `https://d.letsee.io/${id}`;

export const getMessagesCountPath = (entityUri: string, userId: string | null): string => {
  if (userId === null) {
    return `messagesCount/${entityUriToId(entityUri)}/publicMessages`;
  }

  return `messagesCount/${entityUriToId(entityUri)}/authorMessages/${userId}`;
};

export const getMessagesListPath = (entityUri: string, userId: string | null): string => {
  if (userId === null) {
    return `entityMessages/${entityUriToId(entityUri)}/publicMessages`;
  }

  return `entityMessages/${entityUriToId(entityUri)}/authorMessages/${userId}`;
};
