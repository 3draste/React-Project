import {usersAPI} from "../api/api";
import {setTotalUsersCount, setUsers, toggleIsFetching} from "./user-reducer";
import {stopSubmit} from "redux-form";
import {getAuthUserThunk} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';


let initialState = {
    initialized:false
}

const appReducer = (state=initialState, action) => {

    switch (action.type) {

        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true,

            }
        }
        default: {
            return state
        }
    }

}

export const setInitializedSuccess = () => ({type: INITIALIZED_SUCCESS})



export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserThunk())

    Promise.all([promise]).then(() => {


        dispatch(setInitializedSuccess())
    })

    // promise.then(() => {
    //     dispatch(setInitializedSuccess)
    // })
}

export default appReducer;



