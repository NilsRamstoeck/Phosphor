import app from './express-setup';
import {PhosphorMessage} from './types';
import {handleLogin, handleRegister, handleMessage, handleError} from './handlers';
import * as Constants from './constants';
import {validateDatabase} from './db';

validateDatabase().then(() => {
   console.log('VALIDATED DATABASE');

   //TODO: Remove switch and replace with routing
   app.post('/', async function(req, res) {
      const message :PhosphorMessage = req.body;
      switch (message.action) {
         case Constants.action.LOGIN_ACTION:
         res.json(await handleLogin(message));
         break;
         case Constants.action.REGISTER_ACTION:
         res.json(await handleRegister(message));
         break;
         case Constants.action.MESSAGE_ACTION:
         res.json(await handleMessage(message));
         break;
         case undefined:
         case null:
         res.json(handleError(Constants.err.NO_ACTION));
         break;
         default:
         res.json(handleError(Constants.err.UNKNOWN_ACTION));
         break;
      }
   })
})
.catch(err => {
   console.log(err);
});
