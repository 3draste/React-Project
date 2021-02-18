import React from 'react';
import {connect} from "react-redux";
import {
    follow, followThunk, getUsersThunk,
    setCurrentPage,
    setTotalUsersCount,
    setUsers, toggleFollowProgress,
    toggleIsFetching,
    unfollow, unfollowThunk
} from "../../redux/user-reducer";
import UsersC from "./UsersC";
import * as axios from "axios";
import Preloader from "../common/preloader/Preloader";
import {usersAPI} from "../../api/api";
import {AuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers, getUsersSuperSelector
} from "../../redux/users-selectors";

class UsersApiContainer extends React.Component {

    componentDidMount() {
        this.props.getUsersThunk(this.props.currentPage,this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsersThunk(pageNumber,this.props.pageSize)

        this.props.toggleIsFetching(true)
        // this.props.setCurrentPage(pageNumber)
        // usersAPI.getUsers(pageNumber,this.props.pageSize).then(data => {
        //     this.props.toggleIsFetching(false)
        //     // this.props.setUsers(data.items)
        // })

    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <UsersC totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    followingInProgress={this.props.followingInProgress}
                    toggleFollowProgress={this.props.toggleFollowProgress}
                    followThunk = {this.props.followThunk}
                    unfollowThunk={this.props.unfollowThunk}
            />
        </>
    }
}


let mapStateToProps = (state) => {
    return {
        users: getUsersSuperSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

// let mapDispatchToProps = (dispatch) => {
//
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId))
//         },
//
//         unfollow:(userId) => {
//             dispatch(unfollowAC(userId))
//         },
//         setUsers:(users) => {
//             dispatch(setUsersAc(users))
//         },
//         setCurrentPage:(pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount:(totalUsersCount) => {
//             dispatch(setTotalCountAC(totalUsersCount))
//         },
//         toggleIsFetching:(isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }



// const UsersContainer = connect(mapStateToProps,
//     {
//         follow,
//         unfollow,
//         setUsers,
//         setCurrentPage,
//         setTotalUsersCount,
//         toggleIsFetching,
//         toggleFollowProgress,
//          getUsersThunk,
//         followThunk,
//         unfollowThunk
//     })(withRedirect);


export default compose(
    connect(mapStateToProps,
        {
            follow,
            unfollow,
            setUsers,
            setCurrentPage,
            setTotalUsersCount,
            toggleIsFetching,
            toggleFollowProgress,
            getUsersThunk,
            followThunk,
            unfollowThunk
        }),

    AuthRedirect
)(UsersApiContainer)
