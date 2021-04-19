// @flow
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import currentEntity from './currentEntity';
import currentUser from './currentUser';
import entities from './entities';
import helpOpened from './helpOpened';
import shareModal from './shareModal';
import { letseeLoaded, loadingEntity } from './letsee';
import messageForm from './messageForm';
import messagesList from './messagesList';
import selectedSticker from './selectedSticker';
import transformationGuideOpened from './transformationGuideOpened';

const reducers = combineReducers({
  currentEntity,
  currentUser,
  entities,
  helpOpened,
  shareModal,
  letseeLoaded,
  loadingEntity,
  messageForm,
  messagesList,
  selectedSticker,
  transformationGuideOpened,
  saga : {
    auth : { isLoaded: true, isEmpty: true },
    profile : { isLoaded: true, isEmpty: true },
  },
  routing: routerReducer,
});

export default reducers;
