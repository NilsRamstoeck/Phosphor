type PhosphorAction = 'login';

interface PhosphorMessage{
   timestamp: string,
   action: PhosphorAction,
   data: object
}
