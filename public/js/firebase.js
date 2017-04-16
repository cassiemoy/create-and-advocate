// Initialize Firebase
//
var config = {
  apiKey: "AIzaSyCnZ0Otme1WwhM4-CEKZtLjGHCpspa4Kdw",
  authDomain: "function-demo-bd359.firebaseapp.com",
  databaseURL: "https://function-demo-bd359.firebaseio.com/"
};

firebase.initializeApp(config);
var database = firebase.database();

function pushToFirebase(database, table_key, data) {
      var newkey  = database.ref().child(table_key).push().key;
      database.ref(table_key + '/' + newkey).set(data);
}

