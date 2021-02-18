import React from 'react';
import {addPostActionCreator} from "../../../redux/profile-reducer";
import MyPost from "./MyPost";
import {connect} from "react-redux";



// const MyPostContainer = (props) => {
//     debugger
//
//
//     return (
//         <StoreContext.Consumer>{
//             (store) => {
//                 let state = store.getState();
//
//                 let addPost = () => {
//                     store.dispatch(addPostActionCreator())
//                 }
//
//                 let onPostChange = (text) => {
//
//                     let action = updateNewPostTextActionCreator(text)
//
//                     store.dispatch(action)
//                 }
//                 return <MyPost updateNewPostText={onPostChange} addPost={addPost}
//                                newPostText={state.profilePage.newPostText}
//                                posts={state.profilePage.posts}/>
//             }
//         }
//         </StoreContext.Consumer>
//     )
// }

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost:(values) => {
            dispatch(addPostActionCreator(values))
        }
    }
}


const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost);


export default MyPostContainer;