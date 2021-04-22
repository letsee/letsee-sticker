import {
    GET_MESSAGE_LIST_REQUEST,
    GET_MESSAGE_LIST_SUCCESS,
    GET_MESSAGE_LIST_FAILURE,
} from '../actions/apiMessage';

const getMessageList = (state: string | null = null, action) => {
    switch (action.type) {
        case GET_MESSAGE_LIST_REQUEST:
            if (state === null) {
                return action.payload;
            }

            return state;
        case GET_MESSAGE_LIST_SUCCESS:
            if (state === action.payload) {
                return null;
            }

            return state;
        case GET_MESSAGE_LIST_FAILURE:
            if (state === action.payload) {
                return null;
            }
            return state;
        default:
            return state;
    }
};
