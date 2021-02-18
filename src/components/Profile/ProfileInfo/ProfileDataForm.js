import React, {useState} from 'react';
import s from './ProfileInfo.module.css'
import styles from "./../../common/FormsControls/FormsControls.module.css"
import {createField, Input, TextArea} from "../../common/FormsControls/FormsControls";
import {required} from "../../../utils/validators/validators";
import {reduxForm} from "redux-form";
import handleSubmit from "redux-form/lib/handleSubmit";



const ProfileDataForm = ({handleSubmit,profile,error}) => {
    return <form onSubmit={handleSubmit}>
        <div> <button>save</button> </div>
        {error && <div className={styles.formSummeryError}>{error}</div>}
        <div>
            <b>Full name</b>: <div>{createField("Full name","fullName",[],Input)}</div>
        </div>
        <div>
            <b>Looking for a job</b>:<div>{createField("","lookingForAJob",[],Input,{type:"checkbox"})}</div>
        </div>
         <div>
            <b>My professional skills</b>: <div>{createField("My professional skills","lookingForAJobDescription",[],TextArea)}</div>
        </div>
        <div>
            <b>aboutMe</b>:<div>{createField("aboutMe","aboutMe",[],TextArea)}</div>
        </div>

        <div>
            <b>Contancts</b>: {Object.keys(profile.contacts).map(key => {
            return <div>
                <b>{key}:{createField(key,"contacts." + key,[],Input)}</b>
            </div>
        })}
        </div>

    </form>
}

const LoginReduxForm = reduxForm({form:'dataForm'})(ProfileDataForm)
export default LoginReduxForm;