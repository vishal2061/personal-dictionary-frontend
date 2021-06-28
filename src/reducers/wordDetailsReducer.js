import {
    WORD_DETAILS
} from "../actions/type";

const initialState = [];

function wordDetailsReducer(word = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case WORD_DETAILS:
            return payload;

        default:
            return word;
    }
};



export default wordDetailsReducer;