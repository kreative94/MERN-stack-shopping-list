import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING} from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getItems = (id) => (dispatch, getState) => {
    dispatch(setItemsLoading());

    axios.get(`/api/lists/${id}/items`, tokenConfig(getState))
    .then(res => dispatch({
        type: GET_ITEMS,
        payload: res.id
    }))
    .catch(err => 
        dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = (item, list) => (dispatch, getState) => {
    axios.post(`/api/lists/add-item/to/${list}`, item, tokenConfig(getState))
    .then(res => dispatch({
        type: ADD_ITEM,
        payload: res.data.id }))
        .catch(err => 
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const deleteItem = id => (dispatch, getState ) => {
    axios.delete(`/api/lists/delete/${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: DELETE_ITEM,
        payload: id
    }))
    .catch(err => 
        dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
    return{
        type: ITEMS_LOADING
    }
}