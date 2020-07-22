import { 
    GET_USER_LISTS,
    GET_ACTIVE_LIST,
    ADD_LIST,
    DELETE_LIST, 
    LISTS_LOADING, 
    UPDATE_LIST,
    GET_LIST_BY_ID} 
from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getListsFromUser = () => (dispatch, getState ) => {
    dispatch(setListsLoading());
    axios.get('/api/lists/by/user', tokenConfig(getState))
    .then(res => dispatch({
        type: GET_USER_LISTS,
        payload: res.data
    }))
    .catch(err => 
        dispatch(
            returnErrors(
                err.response.data, err.response.status
                )
            )
    );
};

export const getListById = id => ( dispatch, getState ) => {
    dispatch(setListsLoading());
    axios.get(`/api/lists/${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: GET_LIST_BY_ID,
        payload: id
    }))
    .catch(err => 
        dispatch(
            returnErrors(
                err.response.data, err.response.status
                )
            )
    );
};

export const getActiveList = id => ( dispatch, getState ) => {
    dispatch(setListsLoading());
    axios.get(`/api/lists/${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: GET_ACTIVE_LIST,
        payload: id
    }))
    .catch(err => 
        dispatch(
            returnErrors(
                err.response.data, err.response.status
                )
            )
    );
};

export const addList = list => (dispatch, getState) => {
    axios.post('/api/lists', list, tokenConfig(getState))
    .then(res => dispatch({
        type: ADD_LIST,
        payload: res.data
    }))
    .catch(err => 
        dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const updateList = id => (dispatch, getState) => {
    axios.put(`/api/lists/update/${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: UPDATE_LIST,
        payload: id
    }))
    .catch(err => 
        dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteList = id => (dispatch, getState ) => {
    axios.delete(`/api/lists/delete/${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: DELETE_LIST,
        payload: id
    }))
    .catch(err => 
        dispatch(returnErrors(err.response.data, err.response.status))
    );
};


export const setListsLoading = () => {
    return{
        type: LISTS_LOADING
    }
};