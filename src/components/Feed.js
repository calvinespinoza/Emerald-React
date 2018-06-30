import React, { Component } from 'react';
import * as firebase from 'firebase';
import './Feed.css';

export class Feed extends Component {
    constructor(props) {
        super(props);

        //this.handleMessages = this.handleMessages.bind(this);
        this.submitClick = this.submitClick.bind(this);
    }

    submitClick() {
        var mainText = document.getElementById("mainText");


        firebase.auth().onAuthStateChanged(function (user) {
            var messageText = mainText.value;
            if (user) {
                var ref = firebase.database().ref().child("Mensajes");
                var radios = document.getElementsByName('options');

                if (radios[0].checked) {
                    ref.push().set({
                        Usuario: user.uid,
                        Mensaje: messageText,
                        Publico: "True"
                    });
                }

                if (radios[1].checked) {

                    ref.push().set({
                        Usuario: user.uid,
                        Mensaje: messageText,
                        Publico: "False"
                    });


                }

            } else {
                // No user is signed in.
            }
        })
    }

    componentWillMount() {
        var messageRef = firebase.database().ref().child("Mensajes");
        //var msgFeed = document.getElementById("feed");
        //var mf = document.getElementById("mainFeed");

        messageRef.on("child_added", snap => {
            var id = snap.child("Usuario").val();
            var userRef = firebase.database().ref().child("Usuarios").child(id).child("Name");

            userRef.once('value').then(function (snapshot) {
                var name = snapshot.val();
                console.log("Messsage by: " + name);
                var message = snap.child("Mensaje").val();
                var publico = snap.child("Publico").val();

                var user = firebase.auth().currentUser;
                var text;
                var nom;
                if (user) {
                    var mainDiv = document.createElement('div');
                    mainDiv.className = "demo-card-wide mdl-card mdl-shadow--2dp";
                    mainDiv.setAttribute("id", "mainDiv");

                    var card = document.createElement('div');
                    card.className = "mdl-card__title";

                    var titleText = document.createElement('h2');
                    titleText.className = "mdl-card__title-text";
                    titleText.setAttribute("id", "titleText");

                    var msg = document.createTextNode(message);

                    var supText = document.createElement('div');
                    supText.className = "mdl-card__supporting-text";

                    var cardMenu = document.createElement('div');
                    cardMenu.className = "mdl-card__menu";

                    var button = document.createElement('button');
                    button.className = "mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect";

                    var icon = document.createElement('i');
                    icon.className = "material-icons";

                    cardMenu.appendChild(button);
                    button.appendChild(icon);

                    titleText.appendChild(msg);
                    card.appendChild(titleText);
                    mainDiv.appendChild(card);
                    mainDiv.appendChild(supText);
                    mainDiv.appendChild(cardMenu);


                    if (user.uid === id) {
                        nom = document.createTextNode(name + " (You)");
                        if (publico === "False") {
                            text = document.createTextNode('lock');
                        } else {
                            text = document.createTextNode('public');
                        }
                    } else {
                        if (publico === "True") {
                            nom = document.createTextNode(name);
                            text = document.createTextNode('person');
                        }
                    }
                    supText.appendChild(nom);
                    icon.appendChild(text);
                    document.getElementById("mainFeed").appendChild(mainDiv);
                    //mf.appendChild(mainDiv);
                    //mainFeed.appendChild(msgFeed);
                }
            });

        })

    }

    render() {
        return (
            <div>
                <div id="feed">
                    <h1 align="center">F E E D</h1>
                    <h2 align="center">What's on your mind?</h2>
                    <div align="center" id="input-area">
                        <textarea className="mdl-textfield__input" type="text" rows="3" id="mainText" placeholder="Enter text here..."></textarea>
                        <div>
                            <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="option-1">
                                <input type="radio" id="option-1" className="mdl-radio__button" name="options" value="1" checked />
                                <span className="mdl-radio__label">Public</span>
                            </label>
                            <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="option-2">
                                <input type="radio" id="option-2" className="mdl-radio__button" name="options" value="2" />
                                <span className="mdl-radio__label">Private</span>
                            </label>
                            <br />
                        </div>
                        <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored"
                            id="submitBtn" onClick={this.submitClick}>
                            UPLOAD
                    </button>
                    </div>
                </div>
                <div id="mainFeed" align="center">
                </div >
            </div>
        );
    }
}