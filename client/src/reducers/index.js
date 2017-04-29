import {combineReducers} from 'redux';
import * as actions from '../actions';


const envData = (state = [], action) => {
    switch (action.type) {
        case actions.GET_DATA_RECEIVED:
            return action.payload;
        case actions.GET_NEW_ENTITY:
            state.shift();
            const newData = [...state, action.payload];
            return newData;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    envData
});

export default rootReducer;