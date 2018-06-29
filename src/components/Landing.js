import React, { Component } from 'react';
import './Landing.css';
import SignIn from './SignIn';
import logo from './logo.png';

export class Landing extends Component {
    render() {
        return (
            <div id="landing-div">
                <img src={logo} alt="logo" id="main-logo" />
                <div id="h1">Welcome to Emerald!</div>
                <div id="h2">Your social network</div>
                <div id="h3">You are signed out</div>

                <SignIn />
            </div>
        );
    }
}