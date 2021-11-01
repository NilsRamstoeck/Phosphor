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
