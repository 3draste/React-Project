import React, {Component} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route, withRouter} from "react-router-dom"
import UsersContainer from "./components/Users/UsersContainer";
import HeaderComponent from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/preloader/Preloader";
import store from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";
import {Redirect, Switch} from "react-router";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));

// import ProfileContainer from "./components/Profile/ProfileContainer";
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));

class App extends Component {

    catchAllUnhandledErrors = (reason,promise) => {
        alert("Some error occured")
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)



        // usersAPI.authMe().then(response => {
        //     if(response.data.resultCode === 0) {
        //         let {id,Login,email} = response.data.data;
        //         this.props.setAuthUserData(id, email,Login);
        //     }
        //
        // })
    }
    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    render() {
        if(!this.props.initialized){

            return <Preloader/>
        }
        return (
            <BrowserRouter>
                <div className={"app-wraper"}>
                    <HeaderComponent/>
                    <Navbar/>
                    <div className={"app-wraper-content"}>
                        <Switch>
                        {/*<Route path={"/dialogs"} component={Dialogs}/>*/}
                        {/*<Route path={"/profile"} component={Profile}/>*/}

                        <Route exact path={"/"} render={() => <Redirect to={"/profile"}/>}/>
                        <Route path={"/dialogs"} render={withSuspense(DialogsContainer)}/>
                        <Route path={"/profile/:userId?"} component={withSuspense(ProfileContainer)}/>
                        <Route path={"/users"} component={() => <UsersContainer/>}/>
                        <Route path={"/Login"} component={() => <Login/>}/>
                        <Route path={"*"} render={() => <div>NOT FOUND</div>}/>
                        </Switch>
                    </div>


                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})


let AppContainer =  compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))
    (App)

const SamuraiJsApp =(props) => {
   return <BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
}


export default SamuraiJsApp