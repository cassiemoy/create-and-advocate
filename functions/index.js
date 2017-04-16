// From: https://firebase.google.com/docs/functions/get-started#review_complete_sample_code

const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push it into the Realtime Database then send a response
  admin.database().ref('/messages').push({original: original}).then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref);
  });
});

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onWrite(event => {
      // Grab the current value of what was written to the Realtime Database.
      const original = event.data.val();
      console.log('Uppercasing', event.params.pushId, original);
      const uppercase = original.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return event.data.ref.parent.child('uppercase').set(uppercase);
    });

// end of tutorial code!

// Trying out our own function now!

// This handles the request

exports.sendNumber = functions.https.onRequest((req, res) => {

  const number = req.query.number;
  const bodynumber = req.body.number;

  admin.database().ref('/calculations').push({number: number, bodynumber: bodynumber}).then(snapshot => {
    res.redirect(303, snapshot.ref);
  });
});

// This does the computation

exports.squareNumber = functions.database.ref('/calculations/{pushId}/number')
    .onWrite(event => {
      // Grab the current value of what was written to the Realtime Database.
      const number = event.data.val();
      console.log('Squaring!', event.params.pushId, number);
  
      const square = parseInt(number) * parseInt(number);
      
      return event.data.ref.parent.child('squared').set(square);
    });
