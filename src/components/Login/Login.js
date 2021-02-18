import React from 'react'
import {Field, reduxForm} from "redux-form";
import {createField, Input, TextArea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router";
import s from "./../common/FormsControls/FormsControls.module.css"

let maxLength = maxLengthCreator(50)

const LoginForm = ({error,handleSubmit,captchaUrl}) => {
    return (

        <form onSubmit={handleSubmit}>
            <div>{createField("Email","email",[required],Input)}</div>
            <div>{createField("password","password",[required],Input,{type:"password"})}</div>
            <div>{createField(null,"rememberMe",[required],Input,{type:"checkbox"},"remember me")}REMEMBER ME</div>


            {/*<div><Field placeholder={"Email"} name={"email"}  component={Input} validate={[required, maxLength]}/></div>*/}
            {/*<div><Field placeholder={"password"} name={"password"}   component={Input} validate={[required, maxLength]}/></div>*/}
            {/*<div><Field placeholder={"rememberMe"} name={"rememberMe"} type={"checkbox"} component={Input} />remember me</div>*/}

            {/*<div><input placeholder={"login"} /></div>*/}
            {/*<div><input placeholder={"password"} /></div>*/}
            {/*<div><input type="checkbox"/>rememberME</div>*/}

            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl && createField("symbols","captcha",[required],Input,{})}

            {error && <div className={s.formSummeryError}>{error}</div>}
            <div><button>LOGIN</button></div>


        </form>
    )
}

const LoginReduxForm = reduxForm({form:'login'})(LoginForm)


const Login = (props) => {
   const onSubmit = ({email,password,rememberMe,captcha}) => {
       props.login(email,password,rememberMe,captcha)
   }
    if(props.isAuth){
        return <Redirect to={"/profile"}/>
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps,{login})(Login)