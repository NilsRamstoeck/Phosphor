import * as Constants from './constants';
import {PhosphorMessage, PhosphorErrorMessage, PhosphorErrorType} from './types';
import {en_US as locale} from './locale';
import {validateType} from './functions';

export function handleLogin(msg :PhosphorMessage) :object{
   if(msg.data == undefined || msg.data == null) return handleError(Constants.NO_DATA);

   const validator = {
      username: '',
      password: ''
   };

   const validateUsername = function(username :string) :boolean{
      return /^[a-zA-Z0-9_]{3,20}$/.test(username);
   }

   const validatePassword = function(password :string) :boolean{
      return /^.{5,35}$/.test(password);
   }

   if(validateType(msg.data, validator) >= 0){
      const data = msg.data as typeof validator;
      //validate username and password fit requirements
      if(!validateUsername(data.username)){
         return handleError(Constants.INVALID_USERNAME);
      }
      if(!validatePassword(data.password)){
         return handleError(Constants.INVALID_PASSWORD);
      }

      // TODO:  authenticate user if existant


      // TODO:  register user if new

      return msg.data;
   } else {
      return handleError(Constants.INVALID_DATA_TYPE);
   };
}

export function handleMessage(msg :PhosphorMessage) :object {
   // TODO: IMPLEMENT
   return {
      msg: msg,
      err: "Not Implemented"
   }
}


export function handleError(error :PhosphorErrorType) :PhosphorErrorMessage{
   const err_msg :PhosphorErrorMessage = PhosphorErrorMessage({
      error: error,
      message: locale[error]
   });

   return err_msg;
}
