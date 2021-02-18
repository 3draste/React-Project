import React, {useState} from 'react';
import s from './ProfileInfo.module.css'
import Preloader from "../../common/preloader/Preloader";
import photo from './../../../assets/img/user.jpg'
import ProfileStatusReactHooks from "./ProfileStatusReactHooks";
import ProfileDataForm from "./ProfileDataForm";


const ProfileInfo = (props) => {
    let [editMode, setEditMode] = useState(false)

    if(!props.profile){
        return <Preloader/>
    }
    const onMainPhotoSelected = (e) => {
        if(e.target.files.length){
            props.savePhoto(e.target.files[0])
        }
    }
    const onSubmit =  (all) => {
        props.saveProfile(all).then(() => {
            setEditMode(false)
        })

    }
    return (
        <div>
        <div>
            <img
                src="https://static.toiimg.com/thumb/msid-73070532,width-1070,height-580,imgsize-1209854,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg"
                alt=""/>
        </div>
            <div className={s.descriptionBlock} >
                <img src={props.profile.photos.large || photo} className={s.mainPhoto}/>
                {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}

                {editMode ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/>
                : <ProfileData goToEditMode={() => {setEditMode(true)}}
                                 profile={props.profile} isOwner={props.isOwner}/>}
                <ProfileStatusReactHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>

    )
}


const ProfileData = ({profile,isOwner,goToEditMode}) => {
    debugger
    return <div>
        {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}

        <div>
            <b>Full name</b>: {profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob? "yes" : "no"}
        </div>
        { profile.lookingForAJob &&
        <div>
            <b>My professional skills</b>: {profile.lookingForAJobDescription}
        </div>}
        <div>
            <b>aboutMe</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contancts</b>: {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
        })}
        </div>
    </div>

}


const Contact = ({contactTitle,contactValue}) => {
    return <div><b>{contactTitle}</b>: {contactValue}</div>
}

// aboutMe: null
// contacts: {facebook: null, website: null, vk: null, twitter: null, instagram: null, …}
// fullName: "Bektur"
// lookingForAJob: false
// lookingForAJobDescription: null
// photos: {small: "https://social-network.samuraijs.com/activecontent/images/users/13830/user-small.jpg?v=1",
//     large: "https://social-network.samuraijs.com/activecontent/images/users/13830/user.jpg?v=1"}
// userId: 13830


export default ProfileInfo;