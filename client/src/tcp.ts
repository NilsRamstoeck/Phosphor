import {Socket, Server} from 'net';

// export const TCP_PORT_CLIENT = 3098;
export const TCP_PORT_SERVER = 3097;

let signalingSocket: Socket;

function createSignalingSocket(){
	const socket = new Socket();
	socket.connect(TCP_PORT_SERVER, 'phosphor.nasram.net');

	socket.on('data', (data:Buffer) => {
		const message = JSON.parse(data.toString());
		console.log(message);
	})

	socket.on('close', had_error => console.log(had_error?'Connection ended because of error':'Connetion terminated'));

	return socket;
}

export function connectToServer(){
	signalingSocket = createSignalingSocket();
}

export function sendMessage(data: string | Object): void {
	const message = data != typeof String ? JSON.stringify(data) : data as string;
	signalingSocket.write(message);
}

export function connectToUser(username: string) {
	console.log('Connecting to: ' + username);
	const msg = {
		action: 'connect',
		username
	}
	signalingSocket.write(JSON.stringify(msg));
}
