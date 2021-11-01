import * as Constants from "./constants";

/// DEFINE ACTION TYPE //
export type PhosphorAction =
typeof Constants.LOGIN_ACTION |
typeof Constants.MESSAGE_ACTION
;

/// DEFINE ERROR TYPE ///
export type PhosphorErrorType =
typeof Constants.PARSING_ERROR |
typeof Constants.NO_ACTION |
typeof Constants.UNKNOWN_ACTION |
typeof Constants.INVALID_ACTION |
typeof Constants.NO_DATA |
typeof Constants.INVALID_DATA_TYPE |
typeof Constants.INVALID_USERNAME |
typeof Constants.INVALID_PASSWORD |
typeof Constants.MISSING_LOGIN_DETAIL_ERROR
;

// Interface for incoming messages
export interface PhosphorMessage{
   timestamp: string,
   action: PhosphorAction,
   data: object
}

/*
 * ErrorMessages are seperated into templates and fill messages
 * this is to isolate constant computed properties like the timestamp
 * so that it only needs to be computed in one place.
 */

// Template used to create error messages
interface PhosphorErrorMessageTemplate{
   message: string,
   error: PhosphorErrorType
}

// Complete error message that can be sent to the client
export interface PhosphorErrorMessage extends PhosphorErrorMessageTemplate{
   timestamp: string;
}

// Fuction that receives an ErrorMessage template and builds an error message
export function PhosphorErrorMessage(template:PhosphorErrorMessageTemplate) :PhosphorErrorMessage {
   const msg :PhosphorErrorMessage = {
      timestamp: new Date().toISOString(),
      message: template.message,
      error: template.error
   }
   return msg;
}
