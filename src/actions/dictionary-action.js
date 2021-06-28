import {
    GET_WORD,
    RETRIEVE_WORD_LIST,
    RETRIEVE_WORD,
    WORD_DETAILS,
    ADD_WORD

} from "./type";
import DictionaryDataService from '../serves/dictionary-serve';
// import wordDetailsReducer from '../'

export const createWord = (data) => async (dispatch) => {
    try {
        const res = await DictionaryDataService.create(data);

        dispatch({
            type: ADD_WORD,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const getWordsss = (word) => async (dispatch) => {
    console.log("In getWord method", word)
    try {
        const res = await DictionaryDataService.getWord(word);
        console.log("response", res)
        dispatch({
            type: GET_WORD,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};



export const retrieveTutorials = () => async (dispatch) => {
    console.log("from action")
    try {
        const res = await DictionaryDataService.getAll();

        dispatch({
            type: RETRIEVE_WORD_LIST,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const findWord = (word) => async (dispatch) => {
    try {
        const res = await DictionaryDataService.findByWord(word);

        dispatch({
            type: RETRIEVE_WORD_LIST,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const findWordById = (id) => async (dispatch) => {
    try {
        const res = await DictionaryDataService.get(id);

        dispatch({
            type: WORD_DETAILS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};
