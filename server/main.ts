import app from './express-setup';
import {PhosphorMessage} from './types';
import {handleLogin, handleMessage, handleError} from './handlers';
import * as Constants from './constants';

app.post('/', (req, res) => {
   const message :PhosphorMessage = req.body;
   switch (message.action) {
      case Constants.LOGIN_ACTION:
      res.json(handleLogin(message));
      break;
      case Constants.MESSAGE_ACTION:
      res.json(handleMessage(message));
      break;
      case undefined:
      case null:
      res.json(handleError(Constants.NO_ACTION));
      break;
      default:
      res.json(handleError(Constants.UNKNOWN_ACTION));
      break;
   }
});
