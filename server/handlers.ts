import * as Constants from './constants';
import {PhosphorMessage, PhosphorErrorMessage, PhosphorErrorType, PhosphorResponse} from './types';
import {en_US as locale} from './locale';
import {validateType, hash} from './functions';
import {findOne, insertOne} from './db';


//defines the shape of received user data for logins and registering
const UserDataValidator = {
   username: '',
   password: ''
};

function validateUsername(username :string) :boolean{
   return /^[a-zA-Z0-9_]{3,20}$/.test(username);
}

function validatePassword(password :string) :boolean{
   return /^.{5,35}$/.test(password);
}

export async function handleLogin(msg :PhosphorMessage){
   if(msg.data == undefined || msg.data == null) return handleError(Constants.err.NO_DATA);


   if(validateType(msg.data, UserDataValidator) >= 0){
      const data = msg.data as typeof UserDataValidator;
      //validate username and password fit requirements
      if(!validateUsername(data.username)){
         return handleError(Constants.err.INVALID_USERNAME);
      }
      if(!validatePassword(data.password)){
         return handleError(Constants.err.INVALID_PASSWORD);
      }

      let user = await findOne({
         collection: Constants.db.USERS_COLLECTION,
         find: {
            [Constants.db.USERNAME_FIELD]: data.username
         }
      })

      if(user != null){
         const hashedPassword = user[Constants.db.PASSWORD_FIELD];
         const salt = hashedPassword.split(':')[0];
         if(hashedPassword == hash(data.password, salt)){
            return PhosphorResponse(msg, {
               result: true
            })
         } else {
            return handleError(Constants.err.WRONG_DETAILS);
         }
      } else {
         //Tell CLient user doesnt exist
         return handleError(Constants.err.INEXISTENT_USER)
      }

   } else {
      return handleError(Constants.err.INVALID_DATA_TYPE);
   };
}

export async function handleRegister(msg :PhosphorMessage){
   if(msg.data == undefined || msg.data == null) return handleError(Constants.err.NO_DATA);


   if(validateType(msg.data, UserDataValidator) >= 0){
      const data = msg.data as typeof UserDataValidator;
      //validate username and password fit requirements
      if(!validateUsername(data.username)){
         return handleError(Constants.err.INVALID_USERNAME);
      }
      if(!validatePassword(data.password)){
         return handleError(Constants.err.INVALID_PASSWORD);
      }

      let user = await findOne({
         collection: Constants.db.USERS_COLLECTION,
         find: {
            [Constants.db.USERNAME_FIELD]: data.username
         }
      })

      if(user == null){
         // create user
         data.password = hash(data.password);
         console.log(data);

         await insertOne({
            collection: Constants.db.USERS_COLLECTION,
            insert: data
         });

         return PhosphorResponse(msg, {
            result: true
         });

      } else {
         //Tell CLient user already exist
         return handleError(Constants.err.EXISTENT_USER);
      }

   } else {
      return handleError(Constants.err.INVALID_DATA_TYPE);
   };
}

export async function handleMessage(msg :PhosphorMessage) {
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
