/// ACTION CONSTANTS ///
export const action = {
   LOGIN_ACTION: 'login',
   MESSAGE_ACTION: 'message',
   REGISTER_ACTION: 'register'
}

/// ERROR CONSTANTS //
export const err = {
   PARSING_ERROR: 'parsing_error',
   NO_ACTION: 'no_action',
   UNKNOWN_ACTION: 'unknown_action',
   INVALID_ACTION: 'invalid_action',
   NO_DATA: 'no_data',
   INVALID_DATA_TYPE: 'invalid_data_type',
   MISSING_LOGIN_DETAIL_ERROR: 'missing_login_detail',
   INVALID_USERNAME: 'invalid_username',
   INVALID_PASSWORD: 'invalid_password',

   WRONG_DETAILS: 'wrong_password',
   INEXISTENT_USER: 'inexistent_user',
   EXISTENT_USER: 'existent_user',
}


/// DATABASE CONSTANTS ///
export const db = {
   USERS_COLLECTION: 'users',
   USERNAME_FIELD: 'username',
   PASSWORD_FIELD: 'password',
}
