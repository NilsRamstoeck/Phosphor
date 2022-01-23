import 'regenerator-runtime/runtime';
import {createHash} from 'crypto';
import forge from 'node-forge'

const Binary = forge.util.binary;

async function generateKeyPair(data: { username: any; password: any; }): Promise<any>{
   const {username, password} =  data;
   const hash = createHash('sha512')
   .update(password)
   .update(username)
   .digest();
   // const seed = scryptSync(pass, hash, 64);
   let prng = forge.random.createInstance();
   prng.seedFileSync = function(needed){
      var b = forge.util.createBuffer();
      for(let i = 0; i < needed; i++){
         b.putByte(hash[i % hash.length]);
      }
      return b.getBytes();
   }
   return forge.rsa.generateKeyPair({
      bits: 1024,
      e: 65537,
      prng: prng,
      algorithm: 'PRIMEINC'
   });
}

function signMessage(raw: string, privateKey: { sign: (arg0: forge.md.MessageDigest) => string; }): { raw: any; hash: string; signature: string; }{
   const md = forge.md.sha256.create();
   md.update(raw, 'utf8');
   const hash =  Buffer.from(Binary.raw.decode(md.digest().bytes())).toString('base64');
   const signature = Buffer.from(Binary.raw.decode(privateKey.sign(md))).toString('base64');
   return {raw: raw, hash, signature};
}

function verifySignedMessage(msg: { raw: any; hash: string; signature: string; }, publicKey: { verify: (arg0: string, arg1: string) => any; }): any{
   const raw = msg.raw;
   const hash = Binary.raw.encode(Binary.base64.decode(msg.hash))
   const signature = Binary.raw.encode(Binary.base64.decode(msg.signature));

   const md = forge.md.sha256.create();
   md.update(raw, 'utf8');
   if(md.digest().bytes() == hash){
      return publicKey.verify(hash, signature);
   }
   return false;
}

function convertToPem(keyPair: { privateKey: any; publicKey: any; }): { privateKey: string; publicKey: string; } {
   const {privateKey, publicKey} = keyPair;
   const pem = {
      privateKey: forge.pki.privateKeyToPem(privateKey),
      publicKey: forge.pki.publicKeyToPem(publicKey),
   }
   return pem;
}

function privateKeyFromPem(privateKey: string): forge.pki.rsa.PrivateKey{
   return forge.pki.privateKeyFromPem(privateKey);
}

export default {
   generateKeyPair,
   signMessage,
   verifySignedMessage,
   convertToPem,
   privateKeyFromPem
}
