import { PhosphorSession, SignedMessage } from './types';
import {
   scryptSync,
   randomBytes,
   createHash,
   createPublicKey,
   createVerify,
   sign,
   generateKeyPairSync,
} from 'crypto';

/**
* validates that a given object has the exactly the same keys as a given validator
* returns:
* -1   : object is missing keys
*  0   : object has all required keys
*  1   : object has all required keys + extra keys
*
*/
export function validateType(toValidate :any, validator :any) :number{
   if(toValidate == undefined || toValidate == null || validator == undefined || validator == null){
      return -1;
   }
   const toValidate_keys = Object.keys(toValidate);
   const validator_keys = Object.keys(validator);
   if(toValidate_keys.length < validator_keys.length){
      return -1
   } else {
      for(const key of validator_keys){
         if(toValidate[key] == undefined){
            return -1
         }
      }
      if(toValidate_keys.length > validator_keys.length){
         return 1;
      } else {
         return 0;
      }
   }
}

/**
* Hashes a given string
*/
export function hash(toHash :string, salt_hex? :string) :string{
   const salt = salt_hex?Buffer.from(salt_hex, 'hex'):randomBytes(64);
   const hashed = scryptSync(toHash, salt, 64);
   return `${salt.toString('hex')}:${hashed.toString('hex')}`;
}

/**
* Generates a new Session
*/
export function generateSession(user :string) :PhosphorSession{
   const session_id = createHash('sha256')
   .update(randomBytes(32))
   .digest()
   .toString('hex') + user;
   return PhosphorSession({
      session_id: session_id,
      expire: 30
   });
}

export function validateSession(sessionID :string, session :PhosphorSession){
   const salt = session.session_id.split(':')[0];
   return hash(sessionID, salt) == session.session_id;
}

export function verifySignedMessage(msg :SignedMessage, key :string){
   const {raw} = msg;
   const signature = Buffer.from(msg.signature, 'base64');
   const publicKey = createPublicKey(key);
   const verify = createVerify('sha256')
   verify.write(raw);
   verify.end();

   return verify.verify(publicKey, signature);
}
