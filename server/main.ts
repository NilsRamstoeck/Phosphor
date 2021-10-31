import app from './express-setup';
import './functions';
import './types';

app.post('/', (req, res) => {
   // const msg :PhosphorMessage = {
   //    id: -1,
   //    timestamp: (new Date()).toISOString(),
   //    action: 'template',
   //    data: {
   //       text: 'Hallo',
   //    }
   // }
   const msg :PhosphorMessage = req.body;

   res.json({ message: 'Hello Client', received: req.body, response: msg})
});
