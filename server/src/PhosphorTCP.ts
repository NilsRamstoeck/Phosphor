import {Server, Socket} from 'net';
import { validateType } from './functions';
import { PhosphorMessage, SignedMessage } from './types';

const SignedMessageValidator :SignedMessage = {
   raw: '',
   hash: '',
   signature: ''
};


export class PhosphorSocket{
   signedUsername: SignedMessage;
   socket: Socket;
   constructor(socket :Socket){
      this.socket = socket;
   }

   write(message :Object){
      this.socket.write(JSON.stringify(message));
   }
}

export class PhosphorServer extends Server{
   messageReceived: Function;
   openSockets: PhosphorSocket[];

   constructor(){
      super((socket: Socket): void => {
         const pSocket = new PhosphorSocket(socket);

         pSocket.write({
            text: 'Connected to Phosphor signaling server',
            timestamp: new Date().toISOString()
         });

         socket.once('data', (data) => {
            const msg = JSON.parse(data.toString()) as PhosphorMessage;
            if(msg.data == undefined || msg.data == null){
            };
            const signedUsername = (validateType(msg.data, SignedMessageValidator)>=0?msg.data:undefined) as SignedMessage;

            //ensure all values are set
            if(signedUsername != undefined){
               pSocket.signedUsername = signedUsername;
               pSocket.write({
                  msg: 'Successfully connected to signaling server',
                  success: true,
                  timestamp: new Date().toISOString()
               })
            } else {
               pSocket.write({
                  msg: 'Did not receive signed username in valid format, closing connetion',
                  success: false,
                  timestamp: new Date().toISOString()
               })
               socket.end();
            }

         });

         socket.on('data', async (data) => {
            if(!this.messageReceived)return;
            const message = JSON.parse(data.toString()) as PhosphorMessage;
            this.messageReceived(message);
         })

         socket.on('error', async (err) => {
            console.log(err);
         })
      });
   }

}
