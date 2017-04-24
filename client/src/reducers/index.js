import {combineReducers} from 'redux';
import * as actions from '../actions';

const envData = (state = [], action) => {
    switch (action.type) {
        case actions.GET_DATA_RECEIVED:
            return action.payload;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    envData
});

export default rootReducer;