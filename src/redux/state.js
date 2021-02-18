import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE'

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'hi', likesCount: 12},
                {id: 2, message: 'How are you ', likesCount: 11},
            ],
            newPostText: 'it-kamasutra'
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Dimich'},
                {id: 2, name: 'Sasha'},
                {id: 3, name: 'Gregory'},
                {id: 4, name: 'Masha'},
                {id: 5, name: 'Hermos'},

            ],
            messages: [
                {id: 1, name: 'hi'},
                {id: 2, name: 'How are you '},
                {id: 3, name: 'YO'},
                {id: 4, name: 'YO'},
                {id: 5, name: 'YO'},

            ],
            newMessageBody: ""
        },
        sidebar: {}
    },

    _callSubscriber(state) {
        console.log("HELLO WORLD")
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    getState() {

        return this._state
    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage,action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage,action)
        this._state.sidebar = sidebarReducer(this._state.sidebar,action)
        this._callSubscriber(this._state)

    }
}







export default store
window.store = store
