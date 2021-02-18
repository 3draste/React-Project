import {profileAPI, usersAPI} from "../api/api";
import {setTotalUsersCount, setUsers, toggleIsFetching} from "./user-reducer";
import {stopSubmit} from "redux-form";

const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST'
const SUCCESS_PHOTOS = 'SUCCESS_PHOTOS'

let initialState = {
    posts: [
        {id: 1, message: 'hi', likesCount: 12},
        {id: 2, message: 'How are you ', likesCount: 11},
    ],
    profile:null,
    status: ""
}

const profileReducer = (state=initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts:[...state.posts,newPost],
                newPostText: ''
            }

            // let stateCopy = {...state}
            // stateCopy.posts = [...state.posts]
            // stateCopy.posts.push(newPost)
            // stateCopy.newPostText = '';
            // return stateCopy
        }

        case SET_USER_PROFILE: {
            return {...state,profile:action.profile}

        }case SET_STATUS: {
            return {...state,status:action.status}

        }
        case DELETE_POST: {
            return {...state,posts: state.posts.filter(p => p.id != action.postId)}
        }
        case SUCCESS_PHOTOS: {
            return {...state,profile: {...state.profile,photos:action.photos}}
        }
        default: return state
    }

}

export default profileReducer;

export const addPostActionCreator = (newPostText) => ({type: ADD_POST,newPostText})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const deleteUserProfile = (postId) => ({type: DELETE_POST, postId})

export const setNewStatusActionCreator = (status) => ({type: SET_STATUS, status})
export const savePhotoSuccessActionCreator = (photos) => ({type: SUCCESS_PHOTOS, photos})

export const getUserThunk = (userId) => {
    return (dispatch) => {
        usersAPI.getUser(userId).then(response => {

            dispatch(setUserProfile(response.data))
        })
    }
}
export const getStatusThunk = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId).then(response => {

            dispatch(setNewStatusActionCreator(response.data))
        })
    }
}
export const updateStatusThunk = (status) => (dispatch) => {
    try {
        profileAPI.updateStatus(status).then(response => {
            if(response.data.resultCode === 0) {

                dispatch(setNewStatusActionCreator(status))
            }
        })
    }catch (error){
        console.log(error)
    }


}

export const savePhoto = (file) =>async(dispatch) => {
    let response = await profileAPI.savePhoto(file);

    if(response.data.resultCode === 0) {

        dispatch(savePhotoSuccessActionCreator(response.data.data.photos))
    }
}
export const saveProfile = (profile) =>async(dispatch,getState) => {
    const userId = getState().auth.userId;

    let response = await profileAPI.saveProfile(profile);

    if(response.data.resultCode === 0) {
        dispatch(getUserThunk(userId))
    }else{
        dispatch(stopSubmit("dataForm",{_error: response.data.messages[0]}))


        // dispatch(stopSubmit("dataForm",{"contacts": {"facebook": response.data.messages[0]}}))
        // ("login", {_error: message}))

        return Promise.reject(response.data.messages[0])
    }
}

