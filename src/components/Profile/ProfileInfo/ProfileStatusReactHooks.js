import React, {useEffect, useState} from 'react';
import s from './ProfileInfo.module.css'
import ProfileInfo from "./ProfileInfo";
import MyPostContainer from "../MyPosts/MyPostContainer";

const ProfileStatusReactHooks = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status);
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode && <div>
                <b>STATUS:</b><span onDoubleClick={activateEditMode}>{props.status || "------"}"</span></div>}
            {editMode && <div onBlur={deactivateEditMode}><input autoFocus={true}
                                                                 onChange={onStatusChange}
                                                                 value={status}/></div>}

        </div>
    )

}

export default ProfileStatusReactHooks