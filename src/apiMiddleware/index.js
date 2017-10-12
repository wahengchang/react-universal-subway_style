const express = require('express');
const google = require('googleapis');
const urldecode = require('urldecode');

const OAuth2 = google.auth.OAuth2;
const scopes = ['https://www.googleapis.com/auth/plus.me'];

// this is where you include your firebase-admin RxJS and server-side authentication
const router = express.Router();
router.get('/data', (req, res) => { res.send({ msg: 'This is CORS-JWT-enabled API response served Universally' }); });

router.get('/signup/google/:id', (req, res) => {
  const redirectLink = urldecode(req.params.id);
  const oauth2Client = new OAuth2(
    'YOUR_CLIENT_ID',
    'YOUR_CLIENT_SECRET',
    redirectLink,
  );
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
  res.status(200).send(url);
});

module.exports = router;
