import { GET_LISTS, GET_USER_LISTS, GET_ITEMS, 
    ADD_LIST, DELETE_LIST, 
    LISTS_LOADING, USER_LOADED } from "../actions/types";

const initialState = { 
    lists: [],
    loading: false
}

export default function listReducer(state = initialState, action) {
    switch(action.type) {
        case GET_USER_LISTS:
            return {
                ...state,
                lists: action.payload
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
