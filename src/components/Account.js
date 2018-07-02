import React, { Component } from 'react';
import * as firebase from 'firebase';
import './Account.css';

export class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nombre: "Name",
            email: "example@emerald.com",
            photoUrl: "https://goo.gl/WdEvLP",
            publicos: 0,
            privados: 0

        }
    }

    componentDidMount() {
        if (firebase.auth().currentUser !== null) {
            var ref = firebase.database().ref('Usuarios/' + firebase.auth().currentUser.uid);
            console.log("Obtaining data from database...");
            ref.on("value", (snapshot) => {
                this.setState({
                    nombre: snapshot.child("Name").val(),
                    email: snapshot.child("Email").val(),
                    photoUrl: snapshot.child("Photo URL").val(),
                    publicos: snapshot.child("Mensajes Publicos").val(),
                    privados: snapshot.child("Mensajes Privados").val()
                })
            });
        }

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
                    mainDiv.className = "demo-card-wide mdl-card mdl-shadow--2dp col-md-4";
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
                        supText.appendChild(nom);
                        icon.appendChild(text);
                        document.getElementById("mymessages").appendChild(mainDiv); 
                    }

                    //mf.appendChild(mainDiv);
                    //mainFeed.appendChild(msgFeed);
                }
            });

        })

    }

    render() {
        return (
            <div>
                <div id="account-container">
                    <header>
                        <i className="fa fa-bars" aria-hidden="true"></i>
                    </header>
                    <main>
                        <div className="row">
                            <div className="left col-lg-4">
                                <div className="photo-left">
                                    <div className="photo-circle">
                                        <img className="photo" src={this.state.photoUrl} />
                                    </div>
                                    <div className="active"></div>
                                </div>
                                <h4 className="name">{this.state.nombre}</h4>
                                <p className="info">Emerald User</p>
                                <p className="info">{this.state.email}</p>
                                <div className="stats row">
                                    <div className="stat col-xs-4" >
                                        <p className="number-stat">{this.state.publicos + this.state.privados}</p>
                                        <p className="desc-stat">Mensajes</p>
                                    </div>
                                    <div className="stat col-xs-4">
                                        <p className="number-stat">{this.state.privados}</p>
                                        <p className="desc-stat">Private</p>
                                    </div>
                                    <div className="stat col-xs-4" >
                                        <p className="number-stat">{this.state.publicos}</p>
                                        <p className="desc-stat">Public</p>
                                    </div>
                                </div>
                                <div className="social">
                                    <i className="fa fa-facebook-square" aria-hidden="true"></i>
                                    <i className="fa fa-twitter-square" aria-hidden="true"></i>
                                    <i className="fa fa-pinterest-square" aria-hidden="true"></i>
                                    <i className="fa fa-tumblr-square" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div className="right col-lg-8">
                                <ul className="nav">
                                    <li>Your Photos</li>
                                </ul>
                                <div className="row gallery" id="mymessages">
                                    <div className="col-md-4">
                                        <img src="https://image.noelshack.com/fichiers/2017/38/2/1505774813-photo4.jpg" />
                                    </div>
                                    <div className="col-md-4">
                                        <img src="https://image.noelshack.com/fichiers/2017/38/2/1505774814-photo5.jpg" />
                                    </div>
                                    <div className="col-md-4">
                                        <img src="https://image.noelshack.com/fichiers/2017/38/2/1505774814-photo6.jpg" />
                                    </div>
                                    <div className="col-md-4">
                                        <img src="https://image.noelshack.com/fichiers/2017/38/2/1505774817-photo1.jpg" />
                                    </div>
                                    <div className="col-md-4">
                                        <img src="https://image.noelshack.com/fichiers/2017/38/2/1505774815-photo2.jpg" />
                                    </div>
                                    <div className="col-md-4">
                                        <img src="https://image.noelshack.com/fichiers/2017/38/2/1505774816-photo3.jpg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

        );
    }
}