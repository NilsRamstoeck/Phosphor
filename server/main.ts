import app from './express-setup';
import {PhosphorMessage} from './types';
import {handleLogin, handleRegister, handleMessage, handleError} from './handlers';
import * as Constants from './constants';
import {validateDatabase} from './db';

validateDatabase().then(() => {
   console.log('VALIDATED DATABASE');

   app.post('/login', async function (req, res) {
      const message :PhosphorMessage = req.body;
      res.json(await handleLogin(message));
   });

   app.post('/register', async function (req, res) {
      const message :PhosphorMessage = req.body;
      res.json(await handleRegister(message));
   });

   app.post('/message', async function (req, res) {
      const message :PhosphorMessage = req.body;
      res.json(await handleMessage(message));
   });

})
.catch(err => {
   console.log(err);
});
