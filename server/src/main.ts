import app from './express-setup';
import {PhosphorMessage} from './types';
import {handleLogin, handleRegister, handleError} from './handlers';
import * as Constants from './constants';
import {validateDatabase} from './db';

validateDatabase().then(() => {
   console.log('VALIDATED DATABASE');

   app.post('/login', async (req, res) => {
      const message: PhosphorMessage = req.body;
      res.json(await handleLogin(message));
   });

   app.post('/register', async (req, res) => {
      const message: PhosphorMessage = req.body;
      res.json(await handleRegister(message));
   });

})
.catch(err => {
   console.log(err);
});
