import React from 'react';
import s from './Profile.module.css'

import * as axios from "axios";
import {connect} from "react-redux";
import {
    getStatusThunk,
    getUserThunk,
    savePhoto,
    saveProfile,
    setUserProfile,
    updateStatusThunk
} from "../../redux/profile-reducer";
import Profile from "./Profile";
import {Redirect, withRouter} from "react-router-dom";
import {usersAPI} from "../../api/api";
import {AuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";
class ProfileContainer extends React.Component {

    refreshComponents(){
        let userId = this.props.match.params.userId;
        if(!userId){
            userId = this.props.authorizedUserId
            if(!userId) {
                this.props.history.push("/login");
            }
        }
        // usersAPI.getUser(userId).then(response => {
        //
        //     this.props.setUserProfile(response.data)
        // })
        this.props.getUserThunk(userId)
        this.props.getStatusThunk(userId);
    }

    componentDidMount() {
       this.refreshComponents()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshComponents()
        }
    }

    render() {
        return <div className={s.content}>
            <Profile {...this.props} isOwner={!this.props.match.params.userId}
                     profile={this.props.profile} status={this.props.status}
                     updateStatus={this.props.updateStatusThunk}
                    savePhoto={this.props.savePhoto}
                     saveProfile={this.props.saveProfile}
            />

        </div>
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});


// let AuthRedirectComponent = AuthRedirect(ProfileContainer)
//
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)

// connect(mapStateToProps,{getUserThunk})(WithUrlDataContainerComponent);
export default compose(
    connect(mapStateToProps,{getUserThunk,getStatusThunk,updateStatusThunk,savePhoto,saveProfile}),
    withRouter,
    // AuthRedirect
)(ProfileContainer)


