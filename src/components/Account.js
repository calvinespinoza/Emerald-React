import React, { Component } from 'react';
import * as firebase from 'firebase';
import './Account.css';

export class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nombre: "Name",
            email: "example@emerald.com",
            photoUrl: "https://goo.gl/WdEvLP" ,

        }
    }

    componentDidMount()
    {
        if (firebase.auth().currentUser !== null) {
            var ref = firebase.database().ref('Usuarios/'+ firebase.auth().currentUser.uid);
            console.log("Obtaining data from database...");
            ref.on("value", (snapshot) => {
                this.setState({
                    nombre: snapshot.child("Name").val(),
                    email: snapshot.child("Email").val(),
                    photoUrl: snapshot.child("Photo URL").val()
                })
            });
        }
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
                                        <p className="number-stat">3,619</p>
                                        <p className="desc-stat">Followers</p>
                                    </div>
                                    <div className="stat col-xs-4">
                                        <p className="number-stat">42</p>
                                        <p className="desc-stat">Private</p>
                                    </div>
                                    <div className="stat col-xs-4" >
                                        <p className="number-stat">38</p>
                                        <p className="desc-stat">Public</p>
                                    </div>
                                </div>
                                <p className="desc">Hi ! My name is Jane Doe. I'm a UI/UX Designer from Paris, in France. I really enjoy photography and mountains.</p>
                                <div className="social">
                                    <i className="fa fa-facebook-square" aria-hidden="true"></i>
                                    <i className="fa fa-twitter-square" aria-hidden="true"></i>
                                    <i className="fa fa-pinterest-square" aria-hidden="true"></i>
                                    <i className="fa fa-tumblr-square" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div className="right col-lg-8">
                                <ul className="nav">
                                    <li>Gallery</li>
                                    <li>Collections</li>
                                    <li>Groups</li>
                                    <li>About</li>
                                </ul>
                                <span className="follow">Follow</span>
                                <div className="row gallery">
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