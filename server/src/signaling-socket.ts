import {Server, Socket} from 'net';
import { PHOSPHOR_TCP_PORT } from './constants'
import { PhosphorServer } from './PhosphorTCP';
import { PhosphorMessage } from './types';

let signalingServer = createSignalingServer();
signalingServer.on('close', () => signalingServer = createSignalingServer());

function createSignalingServer(): Server {
   const server = new PhosphorServer();

   server.on('error', (err) => {
      console.log(err);
      throw err;
   })

   server.messageReceived = handleMessage;
   server.listen(PHOSPHOR_TCP_PORT);
   console.log('SOCKET OPEN ON PORT ' + PHOSPHOR_TCP_PORT);
   return server;
}

function handleMessage(message :PhosphorMessage, socket :Socket) {
   socket.write(JSON.stringify(message));
}
