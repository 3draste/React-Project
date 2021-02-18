const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE'

let initialState = {
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

    ]

}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, name: body}]
            }
        default:
            return state
    }


}

export default dialogsReducer;

export const sendMessageActionCreator = (newMessageBody) => ({type: SEND_MESSAGE,newMessageBody})

