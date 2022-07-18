import React from 'react';
import {BrowserRouter as Router, Navigate, useRoutes} from "react-router-dom";
import './App.css';
import {withAuthenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Notes from "./notes";

function AppRoutes() {
    return useRoutes(
        [

            {path: '/mainpage', element: <Notes/>},
            {path: "*", element: <Navigate to="/mainpage" replace/>}

        ]
    );
}
function App(){
    return (
        <Router>
          <AppRoutes />
        </Router>
    )
}

export default withAuthenticator(App);