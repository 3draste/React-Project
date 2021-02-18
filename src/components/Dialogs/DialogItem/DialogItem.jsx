import React from 'react';
import s from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {

    let path = "/dialogs/1" + props.id

    return <div className={s.dialog}>
        <NavLink to={path}>{props.name} </NavLink>
    </div>
}

export default DialogItem;
