import * as Constants from "./constants";

/// DEFINE ERROR TYPE ///
export type PhosphorErrorType =
typeof Constants.err.PARSING_ERROR |
typeof Constants.err.NO_ACTION |
typeof Constants.err.UNKNOWN_ACTION |
typeof Constants.err.INVALID_ACTION |
typeof Constants.err.NO_DATA |
typeof Constants.err.INVALID_DATA_TYPE |
typeof Constants.err.INVALID_USERNAME |
typeof Constants.err.INVALID_PASSWORD |
typeof Constants.err.MISSING_LOGIN_DETAIL_ERROR
;

export interface SignedMessage{
   raw: string,
   hash: string,
   signature: string
}

// Interface for incoming messages
export interface PhosphorMessage{
   timestamp: string,
   data: any
}

// Interface for incoming messages
export interface PhosphorUser{
   username: string,
   password: string,
   sessions: PhosphorSession[] //minutes before session timeout
}

/*
 * Outgoing Messages are seperated into templates and full messages
 * this is to isolate constant computed properties like the timestamp
 * so that it only needs to be computed in one place.
 */

/// ERROR MESSAGE ///

// Template used to create error messages
interface PhosphorErrorMessageTemplate{
   message: string,
   error: PhosphorErrorType
}

// Complete error message that can be sent to the client
export interface PhosphorErrorMessage extends PhosphorErrorMessageTemplate{
   timestamp: string,
   result: false
}

// Fuction that receives an ErrorMessage template and builds an error message
export function PhosphorErrorMessage(template:PhosphorErrorMessageTemplate) :PhosphorErrorMessage {
   const msg :PhosphorErrorMessage = {
      timestamp: new Date().toISOString(),
      message: template.message,
      error: template.error,
      result: false
   }
   return msg;
}

/// RESPONSE ///

//Template
interface PhosphorResponseTemplate{
   data?: object
}

export interface PhosphorResponse extends PhosphorResponseTemplate{
   timestamp: string;
   result: true,
}

export function PhosphorResponse(template:PhosphorResponseTemplate) :PhosphorResponse {
   const res :PhosphorResponse = {
      timestamp: new Date().toISOString(),
      data: template.data,
      result: true
   }
   return res;
}

/// Session ///

//Template
interface PhosphorSessionTemplate{
   session_id: string,
   expire: number
}

export interface PhosphorSession extends PhosphorSessionTemplate{
   timestamp: string;
}

export function PhosphorSession(template:PhosphorSessionTemplate) :PhosphorSession {
   const res :PhosphorSession = {
      timestamp: new Date().toISOString(),
      session_id: template.session_id,
      expire: template.expire
   }
   return res;
}
