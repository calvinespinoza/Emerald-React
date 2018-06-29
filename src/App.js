import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import * as firebase from 'firebase';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import  SignIn  from './components/SignIn';
import { Landing } from './components/Landing';
import { Navbar } from './components/Navbar';
import { Feed } from './components/Feed';

import * as routes from './constants/routes';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
    }
    this.handleLoginGoogle = this.handleLoginGoogle.bind(this);
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(authUser => {
      authUser ? this.setState(()=>({authUser}))
              : this.setState(() => ({authUser: null}));
    });
  }


  handleLoginGoogle() {
    if (this.state.user) {
      firebase.auth().signOut()
        .then(result => console.log(`${result} ha salido`))
        .catch(err => console.log(err))
      this.setState({ user: null })
    } else {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then(res => {
          this.setState({
            user: res.user
          })
          this.setState({ google: "Logout Google" })
        })
        .catch(err => console.log("error: " + err))
    }
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Navbar user={this.state.authUser} />
            <Route
              exact path={routes.LANDING}
              component={() => <Landing />}
            />


            <Route
              exact path={routes.SIGN_IN}
              component={() => <SignIn />}
            />
            {/*
            <Route
              exact path={routes.SIGN_UP}
              component={() => <SignUpPage />}
            />
            <Route
              exact path={routes.NEW_EVENT}
              component={() => <NewEvent />}
            />

          
          <Route
            exact path={routes.SIGN_IN}
            component={() => <SignInPage />}
          />
          
           <Route
            exact path={routes.PASSWORD_FORGET}
            component={() => <PasswordForgetPage />}
          />
          */}
            <Route
              exact path={routes.HOME}
              component={() => <Feed />}
            />
            {/*
            <Route
              exact path={routes.ACCOUNT}
              component={() => <Account />}
            />*/}
          </div>

        </Router>

        {this.state.user}
        {/*console.log({this.handleMenu()});*/}
      </div>
    );
  }
}

export default App;
