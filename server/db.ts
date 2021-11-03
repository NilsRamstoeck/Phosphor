import {MongoClient, Document} from 'mongodb';
import details from './db-config';

interface FindParams{
   collection: string,
   find: object
}

interface InserParams{
   collection: string,
   insert: object
}

const db_uri = `mongodb://${details.user}:${details.pass}\@${details.host}:${details.port}`;
const client = new MongoClient(db_uri);

export async function validateDatabase(){
   //Ensure username unique index
   try{
      await client.connect()

      await client
      .db(details.database)
      .collection('users')
      .createIndex({
         username: 1
      },{
         unique: true
      })
   }
   finally{
      await client.close();
   }
}

export async function findOne(cmd :FindParams) :Promise<Document>{
   try {
      // Connect the client to the server
      await client.connect();

      const db = client.db(details.database);
      const collection = db.collection(cmd.collection);

      var doc = await collection.findOne(cmd.find);

   } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
   }
   return doc;
}

export async function find(cmd :FindParams) :Promise<Document>{
   try {
      // Connect the client to the server
      await client.connect();

      const db = client.db(details.database);
      const collection = db.collection(cmd.collection);
      const cursor = collection.find(cmd.find);

      var documents = [];

      await cursor.forEach(doc => {
         documents.push(doc);
      }).catch(err => {
         console.log(err);
      });

   } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
   }
   return documents;
}


export async function insertOne(cmd :InserParams){
   try {
      // Connect the client to the server
      await client.connect();

      const db = client.db(details.database);
      const collection = db.collection(cmd.collection);

      collection.insertOne(cmd.insert);

   } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
   }
}
