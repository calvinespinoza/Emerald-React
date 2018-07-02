const functions = require('firebase-functions');

/*
const admin = require('firebase-admin');
admin.initializeApp();
*/


exports.messageSum = functions.database.ref('Mensajes/{pushId}').onCreate((snapshot) => {
  // Grab the current value of what was written to the Realtime Database.
  const public = snapshot.child('Publico').val();
  const userid = snapshot.child('Usuario').val();
  console.log(userid);

  var userRef = snapshot.ref.parent.parent.child('Usuarios').child(userid);


  userRef.on("value", (snap) => {
    if (public) {
      console.log("its public");
      if (snap.child("Mensajes Publicos").val() !== null) {
        const numPub = snap.child("Mensajes Publicos").val();
        snap.child("Mensajes Publicos").set(numPub + 1);
      } else {
        snap.child("Mensajes Publicos").set(1);
      }
    } else {
      console.log("its private");
      if (snap.child("Mensajes Privados").val() !== null) {
        const numPriv = snap.child("Mensajes Privados").val();
        snap.child("Mensajes Privados").set(numPriv + 1);
      } else {
        snap.child("Mensajes Privados").set(1);
      }
    }


  })

  return true;
  //const original = snapshot.ref.parent.child('Usuarios').child(snapshot.child('{pushId}').child('Usuario').val()).child('Email').val();
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
