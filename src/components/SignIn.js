import React, { Component } from 'react';
import * as firebase from 'firebase';
import * as routes from '../constants/routes';
import { Link, withRouter } from 'react-router-dom';
import './SignIn.css';

const SignIn = ({ history }) =>
    <SignInForm history={history} />


class SignInForm extends Component {
    constructor(props) {
        super(props);


        this.state = {
            user: null,
            exists: false
        }

        this.handleLoginGoogle = this.handleLoginGoogle.bind(this);
        this.userExists = this.userExists.bind(this);
    }

    componentDidMount() {
        if (this.props.user) {
            console.log("culero")
        } else {
            console.log("maricon");
        }
    }

    userExists() {
        var user = this.state.user;
        console.log(user);

        var ref = firebase.database().ref().child("Usuarios").child(user.uid);
        ref.on("value", function (snapshot) {
            var exists = (snapshot.val() !== null);
            console.log(exists);
        });
    }

    handleLoginGoogle() {
        const {
            history,
        } = this.props;
        console.log("Sign In: " + this.props.user);
        if (this.props.user) {
            firebase.auth().signOut();
            /*
              .then(result => console.log(`${result} ha salido`))
              .catch(err => console.log(err))
            this.setState({ user: null })*/
        } else {
            var provider = new firebase.auth.GoogleAuthProvider()
            // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

            firebase.auth().signInWithPopup(provider).then( (result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                this.setState({user: user });

                console.log(user);
                
                var ref = firebase.database().ref().child("Usuarios");


                ref.child(user.uid).set({
                    "Name": user.displayName,
                    "Email": user.email,
                    "Telephone": user.phoneNumber,
                    "Photo URL": user.photoURL,
                    "UID": user.uid
                })
                // ...
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                console.log(error);
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });

            /*
            firebase.auth().signInWithPopup(provider)
                .then(res => {
                    this.setState({
                        user: res.user
                      })
                })
                .catch(err => console.log("error: " + err))
            if (user) {
                console.log("culero")
            } else {
                console.log("maricon");
            }

            var ref = firebase.database().ref().child("Usuarios");
            var user = this.state.user;

            ref.child(user.uid).set({
                "Nombre": user.displayName,
                "Email": user.email,
                "Telephone": user.phoneNumber,
                "Photo URL": user.photoURL,
                "UID": user.uid
            });*/
            history.push(routes.HOME);
        }
    }

    render() {

        return (
            <div id="authButtons">
                <button className="w3-button w3-round-xxlarge" id="bt-login" onClick={this.handleLoginGoogle}>
                    SIGN IN
            </button>
            </div>

        );
    }
}

export default withRouter(SignIn);