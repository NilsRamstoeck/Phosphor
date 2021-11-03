import * as Constants from "./constants";

/// DEFINE ACTION TYPE //
export type PhosphorAction =
typeof Constants.action.LOGIN_ACTION |
typeof Constants.action.MESSAGE_ACTION
;

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

// Interface for incoming messages
export interface PhosphorMessage{
   timestamp: string,
   action: PhosphorAction,
   data: object
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
   result: boolean,
   data?: object
}

export interface PhosphorResponse extends PhosphorResponseTemplate{
   action: string,
   timestamp: string;
}

export function PhosphorResponse(msg:PhosphorMessage, template:PhosphorResponseTemplate) :PhosphorResponse {
   const res :PhosphorResponse = {
      timestamp: new Date().toISOString(),
      action: msg.action,
      result: template.result,
      data: template.data
   }
   return res;
}
