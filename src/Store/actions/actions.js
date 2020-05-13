import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId       
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');   
    localStorage.removeItem('username');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password
        };
      
        axios.post('http://localhost:8080/auth/login', authData)
            .then(res => {
                console.log(res);
                //const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                 localStorage.setItem("username", email);           
                 localStorage.setItem("token", res.data.response);

                 dispatch(authSuccess(res.data.response, res));
            })
            .catch(err => {

                console.log(err.response.data.message);
                dispatch(authFail(err.response.data.message));
            });
    };
};


