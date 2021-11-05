import 'regenerator-runtime/runtime';
import {BinaryLike, createHash, generateKeyPairSync} from 'crypto-browserify';
import forge from 'node-forge'

export async function post (action, data) {
   const msg = {
      timestamp: (new Date()).toISOString(),
      action: action,
      data
   }

   const response = await fetch(`http://${window.location.hostname}:2222`, {
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

export async function generateKey(pass){
   const hash = createHash('sha512')
   .update(pass)
   .digest();

   // const seed = scryptSync(pass, hash, 64);
   let prng = await import('node-forge/lib/random');

   prng.seedFileSync = function(needed){
      let buf = [];
      for(let i = 0; i > needed; i++)buf.push(hash[i]);
      return buf;
   }

   const {privateKey, publicKey} = forge.rsa.generateKeyPair({
      bits: 1024,
      e: 65537,
      prng: prng,
      algorithm: 'PRIMEINC'
   });

   console.log(forge.pki.privateKeyToPem(privateKey));
   console.log(forge.pki.publicKeyToPem(publicKey));

}

export function handleError(error){
   switch(error.error){
      case 'inexistent_user':
      const register_event = new Event('register_event');
      document.dispatchEvent(register_event);
      break;
   }
}
