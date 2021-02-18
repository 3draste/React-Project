import React from 'react'
import styles from './users.module.css';
import * as axios from "axios";
import photo from './../../assets/img/user.jpg'
import {NavLink} from "react-router-dom";
import {toggleFollowProgress} from "../../redux/user-reducer";
import {usersAPI} from "../../api/api";
import Paginator from "../common/pagination/Paginator";
import User from "./User";


let UsersC = ({currentPage,totalUsersCount,pageSize,onPageChanged,followingInProgress,unfollowThunk,followThunk,...props}) => {

    // let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    //
    // let pages = []
    // for (let i = 1; i <= pagesCount; i++) {
    //     pages.push(i);
    // }


    return (<div>
        {/*<div>*/}
        {/*    {pages.map(p => {*/}
        {/*        return <span className={props.currentPage === p && styles.selectedPage}*/}
        {/*                     onClick={(e) => {*/}
        {/*                         props.onPageChanged(p)*/}
        {/*                     }}>{p}</span>*/}
        {/*    })}*/}

        {/*</div>*/}
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalUsersCount={totalUsersCount} pageSize={pageSize}/>

        <div>
        {
            props.users.map(user => <User user={user} key={user.id} followingInProgress={followingInProgress}
                                          unfollowThunk={unfollowThunk}followThunk={followThunk}/>)
        }
        </div>
    </div>)

}

export default UsersC