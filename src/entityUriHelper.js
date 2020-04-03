// @flow
const ENTITY_URI_REGEX = /https?:\/\/d\.letsee\.io\/(.+)/;

//https://d.letsee.io/afqwewq231 => entityUri를 얻기 위해 io/ 뒤의 주소를 가져온다.
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
/**
 * 현재 엔티티에 대한 현재 유저의 MessageList의 firebase경로를 가져오는 method
 * 유저가 없을시 entityMessages/${entityUriToId(entityUri)}/publicMessages 경로를 가져옴
 * 유저가 있다면 entityMessages/${entityUriToId(entityUri)}/authorMessages/${userId} 의 경로로 메세지 리스트들을 가져온다.
 */
export const getMessagesListPath = (entityUri: string, userId: string | null): string => {
  if (userId === null) {
    return `entityMessages/${entityUriToId(entityUri)}/publicMessages`;
  }

  return `entityMessages/${entityUriToId(entityUri)}/authorMessages/${userId}`;
};
