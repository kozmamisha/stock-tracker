import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import admin from './firebase.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hello world');
});

//! TODO: decomposition if required

// registration logic for creating user on server side
app.post('/auth/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });
    res.status(200).send(userRecord);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// login logic only for creating token and pass it through
app.post('/auth/login', async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    res.status(200).send({ uid });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server started!');
});
