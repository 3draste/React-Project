import React from 'react'
import styles from './users.module.css';
import * as axios from "axios";
import photo from './../../assets/img/user.jpg'
import {NavLink} from "react-router-dom";
import {toggleFollowProgress} from "../../redux/user-reducer";
import {usersAPI} from "../../api/api";
import Paginator from "../common/pagination/Paginator";


let User = ({user,followingInProgress,unfollowThunk,followThunk}) => {

    return (<div>
                 <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : photo} className={styles.userPhoto}/>
                    </NavLink>
                    </div>
                    <div>
                    {
                        user.followed
                            ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {

                                unfollowThunk(user.id)


                            }}>UnFollow</button>
                            : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {

                                followThunk(user.id)

                            }}>Follow</button>
                    }

                </div>
            </span>
                <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{"user.location.country"}</div>
                    <div>{"user.location.city"}</div>
                </span>
            </span>
            </div>


    )

}

export default User