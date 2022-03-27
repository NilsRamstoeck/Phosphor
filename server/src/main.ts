import app from './express-setup';
import {PhosphorMessage} from './types';
import {handleLogin, handleRegister, handleContactsRequest} from './handlers';
import {validateDatabase} from './db';
import './signaling-socket';

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

   app.post('/contacts', async (req, res) => {
      const message: PhosphorMessage = req.body;
      res.json(await handleContactsRequest(message));
   });

})
.catch(err => {
   console.log(err);
   process.exit();
});
