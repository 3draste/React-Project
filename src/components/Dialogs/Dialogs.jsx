import React from 'react';
import s from './Dialogs.module.css';
import {NavLink, Redirect} from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {sendMessageActionCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {TextArea} from "../common/FormsControls/FormsControls";

const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>)
    let messageElements = state.messages.map(m => <Message message={m.name} key={m.id}/>)
    let newMessageBody = state.newMessageBody;


    const onSubmit = (values) => {
        props.sendMessage(values.message)
    }

    let onSendMessageClick = () => {
        props.sendMessage()
    }
    let onNewMessageBodyChange = (e) => {
        let body = e.target.value;
        props.updateNewMessageBody(body)
    }

    if(props.isAuth === false) return <Redirect to={"/login"}/>
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}

            </div>
            <div className={s.messages}>
                <div>{messageElements}</div>


                    <DialogsReduxForm onSubmit={onSubmit}/>


            </div>
        </div>


    );
}
let maxLength = maxLengthCreator(10)

const DialogsForm = (props) => {
   return (
       <form onSubmit={props.handleSubmit}>
           <div>
               <Field placeholder={"Enter your message"} name={"message"} component={TextArea}  validate={[required, maxLength]}/>
           </div>

           <div><button>SEND</button></div>
       </form>
   )
}

const DialogsReduxForm = reduxForm({form:'dialogs'})(DialogsForm)

export default Dialogs;
