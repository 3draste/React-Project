import * as axios from "axios";



const instance = axios.create({
    withCredentials: true,
    baseURL:`https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY" : "75487ced-2898-4312-92af-2a5a9cc745df"
    }
})

export const usersAPI = {
    getUsers (currentPage = 1,pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    },
    follow(userId) {
       return instance.post(`follow/${userId}`)
    },
    getUser(userId) {
        console.warn("Obsolete method.PLease use profileAPI object")
        return profileAPI.getProfile(userId)
    },
    authMe(){
        return instance.get(`auth/me`)
    },
    login(email,password,rememberMe= false,captcha){
        return instance.post(`auth/login`,{email,password,rememberMe,captcha})
    },
    logout(){
        return instance.delete(`auth/login`)
    },
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId){
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status){
        return instance.put(`profile/status`, {status:status})
    },
    savePhoto(photoFile){
        const formData = new FormData();
        formData.append("image",photoFile)
        return instance.put(`profile/photo`, formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile){
        return instance.put(`profile`, {profile})
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url/`)
    }
}

export const getUsers2 = (currentPage = 1,pageSize = 10) => {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => response.data);
}


