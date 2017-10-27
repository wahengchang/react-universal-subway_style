/* eslint-disable no-unused-vars */
const express = require('express');
const rxFirebase = require('rx-firebase');
const firebase = require('firebase-admin');
const Observable = require('rxjs').Observable;

rxFirebase.extend(firebase, Observable);
firebase.initializeApp({
  databaseURL: 'https://beck-adminsdk.firebaseio.com',
  storageBucket: 'beck-adminsdk.appspot.com',
  credential: firebase.credential.cert(require('../path-to-firebase-adminsdk.json')),
});

const db = firebase.database();
const bucket = firebase.storage().bucket(); // for storage usage
const router = express.Router();

router.get('/data', (req, res) => {
  const ref = db.ref('/test');
  ref.set({ a: 1, b: 2, c: 3 }).then(() => {
    ref.observe('child_added').take(3).subscribe({
      complete: () => res.send({ msg: 'Raised on hip-hop and foster care, defiant city kid Ricky gets a fresh start in the New Zealand countryside. He quickly finds himself at home with his new foster family' }),
    });
  });
});

module.exports = router;
