import {securityAPI, usersAPI} from "../api/api";
import {setTotalUsersCount, setUsers, toggleIsFetching} from "./user-reducer";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL = 'samurai-network/auth/SET_CAPTCHA_URL';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl:null
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL:{
            return {
                ...state,
                ...action.payload,

            }
        }
        default: {
            return state
        }
    }

}


export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
})

export const getCaptchaURL = (captchaUrl) => ({type: GET_CAPTCHA_URL, payload: {captchaUrl}})


export const getAuthUserThunk = () => async (dispatch) => {
    let response = await usersAPI.authMe()

    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true))
    }


}


export const login = (email, password, rememberMe,captcha) => async (dispatch) => {

       let response = await usersAPI.login(email, password, rememberMe,captcha).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserThunk())
            } else {
                if(response.data.resultCode === 10){
                    dispatch(getCaptcha())
                }
                let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some Error"
                dispatch(stopSubmit("login", {_error: message}))
            }

        })
}
export const getCaptcha = () => async (dispatch) => {

    let response = await securityAPI.getCaptchaUrl()
    let captchaUrl = response.data.url
    dispatch(getCaptchaURL(captchaUrl))
}

export const logout = () => {
    return (dispatch) => {
        usersAPI.logout().then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }

        })
    }
}


export default authReducer;



