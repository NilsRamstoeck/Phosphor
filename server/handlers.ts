import * as Constants from './constants';
import {en_US as locale} from './locale';

import {
   findOne,
   insertOne,
   updateOne
} from './db';

import {
   validateType,
   verifySignedMessage
} from './functions';

import {
   PhosphorMessage,
   PhosphorErrorMessage,
   PhosphorErrorType,
   PhosphorResponse,
} from './types';

//defines the shape of received user data for logins and registering
const SignedMessageValidator = {
   raw: '',
   hash: '',
   signature: ''
};

function validateUsername(username :string) :boolean{
   return /^[a-zA-Z0-9_]{3,20}$/.test(username);
}

export async function handleLogin(msg :PhosphorMessage){
   if(msg.data == undefined || msg.data == null) return handleError(Constants.err.NO_DATA);

   //verify message
   const signedMessage = (validateType(msg.data.msg, SignedMessageValidator)>=0?msg.data.msg:undefined) as typeof SignedMessageValidator;
   const user = await findOne({
      collection: Constants.db.USERS_COLLECTION,
      find: {
         [Constants.db.USERNAME_FIELD]: signedMessage.raw
      }
   });

   if(user==null)return handleError(Constants.err.INEXISTENT_USER);

   const publicKey = user[Constants.db.PUBKEY_FIELD];

   //ensure all values are set
   if(signedMessage == undefined || publicKey == null){
      return handleError(Constants.err.INVALID_DATA_TYPE);
   }


   if(!verifySignedMessage(signedMessage, publicKey))
   // TODO: replace with appropiate error
   return handleError(Constants.err.INVALID_PASSWORD);

   //there is no data that needs to be returned for now
   return PhosphorResponse({});
}

export async function handleRegister(msg :PhosphorMessage) :Promise<PhosphorResponse | PhosphorErrorMessage>{
   if(msg.data == undefined || msg.data == null) return handleError(Constants.err.NO_DATA);
   //verify message
   const signedMessage = (validateType(msg.data.msg, SignedMessageValidator)>=0?msg.data.msg:undefined) as typeof SignedMessageValidator;
   const username = signedMessage.raw;
   const publicKey = msg.data.publicKey;

   //ensure all values are set
   if(signedMessage == undefined ||
      publicKey == undefined || publicKey == null ||
      username == undefined || username == null
   ){
      return handleError(Constants.err.INVALID_DATA_TYPE);
   }

   if(!validateUsername(username))
   return handleError(Constants.err.INVALID_USERNAME);

   const username_taken = (await findOne({
      collection: Constants.db.USERS_COLLECTION,
      find: {
         [Constants.db.USERNAME_FIELD]: username
      }
   })) != null;

   if(username_taken)
   return handleError(Constants.err.EXISTENT_USER);

   if(!verifySignedMessage(signedMessage, publicKey))
   // TODO: replace with appropiate error
   return handleError(Constants.err.INVALID_PASSWORD);


   //enter new user into db
   const result = await insertOne({
      collection: Constants.db.USERS_COLLECTION,
      insert: {
         [Constants.db.USERNAME_FIELD]: username,
         [Constants.db.PUBKEY_FIELD]: publicKey,
      }
   });

   if(!result)
   // TODO: replace with appropiate error
   return handleError(Constants.err.PARSING_ERROR);

   //there is no data that needs to be returned for now
   return PhosphorResponse({});
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
