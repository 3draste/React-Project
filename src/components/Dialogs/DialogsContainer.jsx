import React from 'react';
import {sendMessageActionCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../redux/profile-reducer";
import MyPost from "../Profile/MyPosts/MyPost";
import StoreContext from "../../StoreContext";
import {AuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";
// const DialogsContainer = (props) => {
//
//     return (
//         <StoreContext.Consumer>{
//             (store)=> {
//                 let state = store.getState().dialogsPage;
//
//                 let onSendMessageClick = () => {
//                     store.dispatch(sendMessageActionCreator())
//                 }
//
//                 let onNewMessageBodyChange = (body) => {
//                     store.dispatch(updateNewMessageBodyCreator(body))
//                 }
//
//                 return <Dialogs sendMessage={onSendMessageClick} updateMessage={onNewMessageBodyChange}
//                          dialogsPage={state}/>
//             }
//         }
//         </StoreContext.Consumer>
//     );
// }



let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,

    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage:(newMessageBody) => {
            dispatch(sendMessageActionCreator(newMessageBody))
        }
    }
}

let AuthRedirectComponent = AuthRedirect(Dialogs)

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    AuthRedirect
)(Dialogs)