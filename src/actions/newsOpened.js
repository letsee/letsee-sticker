// @flow
export const OPEN_NEWS: 'OPEN_NEWS' = 'OPEN_NEWS';
export const CLOSE_NEWS: 'CLOSE_NEWS' = 'CLOSE_NEWS';

export const openNews = () => ({ type: OPEN_NEWS });
export const closeNews = () => ({ type: CLOSE_NEWS });
