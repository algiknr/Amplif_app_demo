import React from 'react';
import {BrowserRouter as Router, Navigate, useRoutes} from "react-router-dom";
import './App.css';
import {Flex,Authenticator,ThemeProvider,Theme,defaultTheme} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Movie from "./movie";
import {Header} from "./Header";
import MovieImageList from "./myMovieList";
//import Box from "@mui/material/Box";
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

Auth.configure(awsconfig);
const components = {
    Header
};

function AppRoutes({username}) {
    return useRoutes(
        [
            {path: '/mymovielist', element: <MovieImageList user={username}/>},
            {path: '/', element: <Movie user={username}/>},
            {path: "*", element: <Navigate to="/" replace/>}

        ]
    );
}
const { tokens } = defaultTheme;

const theme: Theme = {

    name: 'Auth Example Theme',
    tokens: {
        colors: {
            brand: {
                primary: {
                    '10': tokens.colors.green['10'],
                    '20': tokens.colors.green['20'],
                    '40': tokens.colors.green['40'],
                    '60': tokens.colors.green['60'],
                    '80': tokens.colors.green['80'],
                    '90': tokens.colors.green['90'],
                    '100': tokens.colors.green['100'],
                },
            },
        },
    },
};

function App(){
    return (
        <div style={{
            backgroundImage: `url("https://wallpapercave.com/wp/wp7489432.jpg")`,
            backgroundSize:"cover"
        }}>
            <Flex padding={"1rem"}
                backgroundColor={tokens.colors.background.secondary}

                justifyContent="center"
            >

        <ThemeProvider theme={theme}>
        <Authenticator components={components}>

            {({  user }) => (
        <Router>
          <AppRoutes  username={user.email} />
        </Router>)}
        </Authenticator>
        </ThemeProvider>
            </Flex></div>

    )
}

export default (App);