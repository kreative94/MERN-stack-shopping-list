import { combineReducers } from 'redux';
import itemReducer from './ItemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import listReducer from './listReducer';

export default combineReducers({
    error: errorReducer,
    item: itemReducer,
    list: listReducer,
    auth: authReducer
});

// export default combineReducers({
//     item: itemReducer,
//     list: listReducer,
//     error: errorReducer,
//     auth: authReducer
// });
