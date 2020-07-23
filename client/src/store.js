import { createStore, applyMiddleware, compose } from 'redux';
import { devToolsEnhancer, composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
// import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleWare = [thunk];

//In Development
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//     rootReducer, initialState, composeEnhancers(
//         applyMiddleware(...middleWare)
//             ));

const composeEnhancers = composeWithDevTools({

})

const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middleWare)
));

export default store;