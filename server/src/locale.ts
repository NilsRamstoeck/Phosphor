import * as Constants from './constants';

export const en_US = {
   [Constants.err.NO_ACTION]: 'Message has no action set',
   [Constants.err.UNKNOWN_ACTION]: 'Requested action is unknown',
   [Constants.err.INVALID_ACTION]: 'Requested action is invalid',
   [Constants.err.NO_DATA]: 'Message has no data to parse',
   [Constants.err.INVALID_DATA_TYPE]: 'Sent data format is invalid for requested action',
   [Constants.err.PARSING_ERROR]: 'Failed to parse Message',
   [Constants.err.INVALID_USERNAME]: 'Username is not valid',
   [Constants.err.INVALID_PASSWORD]: 'Password is not valid',
   [Constants.err.MISSING_LOGIN_DETAIL_ERROR]: 'Username and Password cannot be empty',
   [Constants.err.INEXISTENT_USER]: 'No User is associated with that name',
   [Constants.err.EXISTENT_USER]: 'Username is already taken',
   [Constants.err.WRONG_DETAILS]: 'Username and Password do not match',
};
