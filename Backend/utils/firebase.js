const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Replace with the path to your Firebase service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://renify-bd804.appspot.com' // Replace with your Firebase storage bucket URL
});

const bucket = admin.storage().bucket();
module.exports = bucket;
