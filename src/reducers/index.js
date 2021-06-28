import { combineReducers } from "redux";
import dictionaryReducer from "./diction-reducer";
import wordDetailsReducer from './wordDetailsReducer';

export default combineReducers({
    words: dictionaryReducer,
    wordDetails: wordDetailsReducer
});
