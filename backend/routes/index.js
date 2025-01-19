var express = require('express');
var router = express.Router();


var admin = require("firebase-admin");
var serviceAccount = require('C:\\Users\\theod\\Desktop\\Proiect_TIC\\backend\\serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

router.get('/firestore', (req, res, next) => {
  const collectionName = req.query.collection; 
  const documentId = req.query.id; 

  if (!collectionName || !documentId) {
    return res.status(400).send("Missing collection name or document ID in Firestore.");
  }

  const docRef = db.collection(collectionName).doc(documentId);

  docRef.get().then(doc => {
    if (doc.exists) {
      res.status(200).json(doc.data()); 
    } else {
      res.status(404).send("No such document.");
    }
  }).catch(error => {
    console.error("Error retrieving document:", error);
    res.status(500).send("Error retrieving document from Firestore.");
  });
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

