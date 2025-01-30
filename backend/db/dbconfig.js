var admin = require("firebase-admin");
const { createFirestoreInstance } = require("firelordjs");

var serviceAccount = require('C:\\Users\\theod\\Desktop\\Proiect_TIC\\backend\\serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const fireLord = createFirestoreInstance(db);


module.exports = fireLord;