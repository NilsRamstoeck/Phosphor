import 'regenerator-runtime/runtime';
// import {BinaryLike, createHash} from 'crypto-browserify';
// import forge from 'node-forge'

// const Binary = forge.util.binary;

// window.forge = forge;

export async function post (action, data) {
   const msg = {
      timestamp: (new Date()).toISOString(),
      data
   }

   const response = await fetch(`http://localhost:2222/${action}`, {
      method: 'post',
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(msg)
   })
   .then((response) => response.json());

   console.log(response);

   return response;
}
//
// export async function generateKeyPair(data){
//    const {username, password} =  data;
//    const hash = createHash('sha512')
//    .update(password)
//    .update(username)
//    .digest();
//    // const seed = scryptSync(pass, hash, 64);
//    let prng = forge.random.createInstance();
//    prng.seedFileSync = function(needed){
//       var b = forge.util.createBuffer();
//       for(let i = 0; i < needed; i++){
//          b.putByte(hash[i % hash.length]);
//       }
//       return b.getBytes();
//    }
//    window.prng = prng;
//    return forge.rsa.generateKeyPair({
//       bits: 1024,
//       e: 65537,
//       prng: prng,
//       algorithm: 'PRIMEINC'
//    });
//    console.log('gen');
// }
//
// export function signMessage(raw, privateKey){
//    const md = forge.md.sha256.create();
//    md.update(raw, 'utf8');
//    const hash =  Buffer.from(Binary.raw.decode(md.digest().bytes())).toString('base64');
//    const signature = Buffer.from(Binary.raw.decode(privateKey.sign(md))).toString('base64');
//    return {raw: raw, hash, signature};
// }
//
// export function verifySignedMessage(msg, publicKey){
//    const raw = msg.raw;
//    const hash = Binary.raw.encode(Binary.base64.decode(msg.hash))
//    const signature = Binary.raw.encode(Binary.base64.decode(msg.signature));
//
//    const md = forge.md.sha256.create();
//    md.update(raw, 'utf8');
//    if(md.digest().bytes() == hash){
//       return publicKey.verify(hash, signature);
//    }
//    return false;
// }
//
// export function convertToPem(keyPair) {
//    const {privateKey, publicKey} = keyPair;
//    const pem = {
//       privateKey: forge.pki.privateKeyToPem(privateKey),
//       publicKey: forge.pki.publicKeyToPem(publicKey),
//    }
//    return pem;
// }
//
export function handleError(error){
   switch(error.error){
      case 'inexistent_user':
      const register_event = new Event('register_event');
      document.dispatchEvent(register_event);
      break;
   }
}

export function loadMessages(name){
   console.log('msg');
   return [
      {
         sender: name,
         content: 'Hello',
         timestamp:  new Date().toLocaleString().split(' ')[1]
      },
      {
         sender: name,
         content: 'How are you?',
         timestamp:  new Date().toLocaleString().split(' ')[1]
      },
      {
         sender: localStorage.username,
         content: 'I\'m good',
         timestamp:  new Date().toLocaleString().split(' ')[1]
      },
      {
         sender: localStorage.username,
         content: 'This is just a layout test though :)',
         timestamp:  new Date().toLocaleString().split(' ')[1]
      },
   ]
}
