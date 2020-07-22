import { GET_USER_LISTS, 
    ADD_LIST, DELETE_LIST,
    UPDATE_LIST,
    GET_ACTIVE_LIST, 
    LISTS_LOADING } from "../actions/types";
// import authReducer from './authReducer';

const initialState = { 
    lists: [],
    loading: false,
    activeList: {}
}

export default function listReducer(state = initialState, action) {
    switch(action.type) {
        case GET_USER_LISTS:
            return {
                ...state,
                lists: action.payload
            }
        case GET_ACTIVE_LIST:
            return{
                ...state,
                activeList: state.lists.filter(
                    activeList => activeList._id === action.payload
                )
            }
        case UPDATE_LIST: 
            return {
                ...state,
                lists: state.lists.filter(
                    list => list._id === action.payload
                )
            }
        case DELETE_LIST:
            return {
                ...state,
                lists: state.lists.filter(
                    list => list._id !== action.payload)
            }
        case ADD_LIST:
            return{
                ...state,
                lists: [action.payload, ...state.lists]
            }
        case LISTS_LOADING:
            return{
                ...state,
                loading: true
            }
        default:
            return state;
    }
}
