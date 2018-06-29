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

        /*
        this.state = {
            user: null
        }*/

        this.handleLoginGoogle = this.handleLoginGoogle.bind(this);
    }

    componentDidMount() {
        if (this.props.user) {
            console.log("culero")
        } else {
            console.log("maricon");
        }
    }

    handleLoginGoogle() {
        const {
            history,
        } = this.props;
        console.log("hola");
        if (this.props.user) {
            firebase.auth().signOut();
            /*
              .then(result => console.log(`${result} ha salido`))
              .catch(err => console.log(err))
            this.setState({ user: null })*/
        } else {
            var user = this.props.user;
            const provider = new firebase.auth.GoogleAuthProvider()
            provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

            firebase.auth().signInWithPopup(provider)

                .then(/*res => {
              this.setState({
                user: res.user
              })
              this.setState({ google: "Logout Google" })
            }*/)
                .catch(err => console.log("error: " + err))
            if (this.props.user) {
                console.log("culero")
            } else {
                console.log("maricon");
            }

            var ref = firebase.database().ref().child("Usuarios");

            ref.child(user.uid).set({
                "Nombre": user.displayName,
                "Email": user.email,
                "Telephone": user.phoneNumber,
                "Photo URL": user.photoURL,
                "UID": user.uid
            });
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