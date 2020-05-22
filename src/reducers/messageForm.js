// @flow
import {
  INIT_MESSAGE_FORM,
  INIT_EDIT_MESSAGE_FORM,
  DESTROY_MESSAGE_FORM,
  SET_MESSAGE_PRIVACY,
  SET_MESSAGE_FORM_ID,
  SUBMIT_MESSAGE_FORM,
  SUBMIT_MESSAGE_FORM_SUCCESS,
  SUBMIT_MESSAGE_FORM_ERROR,
  ADD_STICKER,
  DELETE_STICKER,
  RESET_STICKER,
  TRANSFORM_STICKER,
  ZOOM_IN_STICKER,
  ZOOM_OUT_STICKER,
  UNDO_STICKER
} from '../actions';
import type { MessageForm, MessageFormSticker } from '../types';

const sticker = (state: MessageFormSticker | null = null, action): MessageFormSticker | null => {
  switch (action.type) {
    case ADD_STICKER:
      const { selected, ...other } = action.payload;

      return {
        ...other,
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        quaternion: {
          x: 0,
          y: 0,
          z: 0,
          w: 1,
        },
        scale: 1,
      };
    case DELETE_STICKER:
      return null;
    case RESET_STICKER:
      return {
        ...state,
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        quaternion: {
          x: 0,
          y: 0,
          z: 0,
          w: 1,
        },
        scale: 1,
      };
  
    case ZOOM_IN_STICKER:
      const zoomInScale  = state.scale + 0.2;
      return {
        ...state,
        scale: zoomInScale,
      };
      
    case ZOOM_OUT_STICKER:
      const zoomOutScale = state.scale > 0.1 ? state.scale - 0.2 : 0.1;
      return {
        ...state,
        scale: zoomOutScale,
      };
      
    case TRANSFORM_STICKER:
      if (state !== null) {
        return {
          ...state,
          ...action.payload.transform,
        };
      }

      return state;
    default:
      return state;
  }
};

const stickersById = (state: { [id: string]: MessageFormSticker } = {}, action): { [id: string]: MessageFormSticker } => {
  switch (action.type) {
    case ADD_STICKER:
    case DELETE_STICKER:
    case RESET_STICKER:
    case ZOOM_IN_STICKER:
    case ZOOM_OUT_STICKER:
    case TRANSFORM_STICKER:
      return {
        ...state,
        [action.payload.id]: sticker(state[action.payload.id], action),
      };
    default:
      return state;
  }
};

const stickersAllIds = (state: string[] = [], action): string[] => {
  switch (action.type) {
    case ADD_STICKER:
      return [
        ...state,
        action.payload.id,
      ];
    case DELETE_STICKER:
      return state.filter(id => id !== action.payload.id);
    default:
      return state;
  }
};

const messageForm = (state: MessageForm | null = null, action): MessageForm | null => {
  switch (action.type) {
    case INIT_MESSAGE_FORM:
      if (state === null) {
        return {
          id: null,
          stickers: {
            byId: {},
            allIds: [],
          },
          error: false,
          public: true,
          submitting: false,
          submitted: false,
          ...action.payload,
        };
      }

      return state;
    case INIT_EDIT_MESSAGE_FORM:
      return action.payload;
    case DESTROY_MESSAGE_FORM:
      return null;
    case SET_MESSAGE_PRIVACY:
      if (state !== null) {
        return {
          ...state,
          public: action.payload.public,
        };
      }

      return state;
    case SET_MESSAGE_FORM_ID:
      if (state !== null) {
        return {
          ...state,
          id: action.payload.id,
        };
      }

      return state;
    case SUBMIT_MESSAGE_FORM:
      if (state !== null) {
        return {
          ...state,
          error: false,
          submitting: true,
          submitted: false,
        };
      }

      return state;
    case SUBMIT_MESSAGE_FORM_SUCCESS:
      if (state !== null) {
        return {
          ...state,
          id: action.payload.id,
          error: false,
          submitting: false,
          submitted: true,
        };
      }

      return state;
    case SUBMIT_MESSAGE_FORM_ERROR:
      if (state !== null) {
        return {
          ...state,
          error: true,
          submitting: false,
          submitted: false,
        };
      }

      return state;
    case ADD_STICKER:
    case DELETE_STICKER:
    case TRANSFORM_STICKER:
    case RESET_STICKER:
    case ZOOM_IN_STICKER:
    case ZOOM_OUT_STICKER:
      // Action을 자식으로 전달하여 결과 처리된 결과 State를 불러온뒤 byId, allIds에 저장함.
      // 해당 결과는 MessageForom의 stickers로 저장되어진다.
      // 하위에는 또다른 state에 대해 (MessageFormState) 상태가 갱신되어진다.
      // <구조>
      // messageForm (MessageForm) => stickers => byId => ([id: string]: MessageFormSticker) => (MessageFormSticker) ||
      // messageForm (MessageForm) => stickers => AllIds => [] (string)
      if (state !== null) {
        return {
          ...state,
          stickers: {
            byId: stickersById(state.stickers.byId, action),
            allIds: stickersAllIds(state.stickers.allIds, action),
          },
        };
      }

      return state;
    default:
      return state;
  }
};

export default messageForm;
