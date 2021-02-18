import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Preloader from "../components/common/preloader/Preloader";


export const withSuspense = (Component) => {
    return (props) => {
        return <React.Suspense fallback={<div><Preloader/></div>}>
            <Component {...props } />
        </React.Suspense>

    }
}