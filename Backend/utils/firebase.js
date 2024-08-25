const admin = require('firebase-admin');
// const serviceAccount = require('./serviceAccountKey.json'); // Replace with the path to your Firebase service account key

const firebaseCredentials = JSON.parse(process.env.FIREBASE_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials),
  storageBucket: 'gs://renify-bd804.appspot.com' // Replace with your Firebase storage bucket URL
});


const bucket = admin.storage().bucket();
module.exports = bucket;
