const functions = require('firebase-functions');


exports.makeUppercase = functions.database.ref()
  .onCreate((snapshot) => {
    // Grab the current value of what was written to the Realtime Database.
    const original = "hello";
    //const original = snapshot.ref.parent.child('Usuarios').child(snapshot.child('{pushId}').child('Usuario').val()).child('Email').val();
    console.log('Uppercasing');
    const uppercase = original.toUpperCase();
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    return snapshot.ref.child('uppercase').set(uppercase);
  });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
