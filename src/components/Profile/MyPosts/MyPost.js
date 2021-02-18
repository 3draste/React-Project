import React from 'react';
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {TextArea} from "../../common/FormsControls/FormsControls";

// PureComponent
// shouldComponentUpdate(nextProps, nextState) {
//     return nextProps != this.props || nextState != this.state;
// }
const MyPost = React.memo((props) => {

    let postElements = props.posts.map(post => <Post message={post.message} likesCount={post.likesCount}/>)

    let newPostElement = React.createRef();

    const onSubmit = (values) => {
        props.addPost(values.postText)
    }

    return (
        <div>My posts
            <MyPostReduxForm onSubmit={onSubmit}/>

            <div className={s.posts}>
                {postElements}
            </div>
        </div>)
})


let maxLength = maxLengthCreator(10)

const MyPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"GGPSDOOEWLSDDS"} name={"postText"} component={TextArea} validate={[required, maxLength]}/>
            </div>
            <div>
                <button>ADD post</button>
            </div>
        </form>
    )
}


const MyPostReduxForm = reduxForm({form: 'PostForm'})(MyPostForm)

export default MyPost;