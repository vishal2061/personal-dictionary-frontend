import {
    GET_WORD,
    RETRIEVE_WORD_LIST,
    RETRIEVE_WORD,
    ADD_WORD
} from "../actions/type";

const initialState = [];

function dictionaryReducer(words = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_WORD:
            return [...words, payload];

        case GET_WORD:
            return [...words, payload];

        case RETRIEVE_WORD_LIST:
            return payload;

        case RETRIEVE_WORD:
            return payload;

        default:
            return words;
    }
};

export default dictionaryReducer;