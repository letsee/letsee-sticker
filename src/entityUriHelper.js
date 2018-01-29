// @flow
const ENTITY_URI_REGEX = /https?:\/\/d\.letsee\.io\/(.+)/;

// get eid from entity uri
export const entityUriToId = (uri: string): string => {
  const m = uri.match(ENTITY_URI_REGEX);

  if (m) {
    return m[1];
  }

  return uri;
};

// get entity uri from eid
export const entityIdToUri = (id: string): string => `https://d.letsee.io/${id}`;

// create firebase messages count path
export const getMessagesCountPath = (entityUri: string, userId: string | null): string => {
  if (userId === null) {
    return `messagesCount/${entityUriToId(entityUri)}/publicMessages`;
  }

  return `messagesCount/${entityUriToId(entityUri)}/authorMessages/${userId}`;
};

// create firebase messages object path
export const getMessagesListPath = (entityUri: string, userId: string | null): string => {
  if (userId === null) {
    return `entityMessages/${entityUriToId(entityUri)}/publicMessages`;
  }

  return `entityMessages/${entityUriToId(entityUri)}/authorMessages/${userId}`;
};
