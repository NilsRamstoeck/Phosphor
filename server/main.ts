import express from 'express';

const app = express();

app.options("/*", function(_req, res, _next){
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
   res.send(200);
});

app.use(function(_req, res, next) {
   res.header("Access-Control-Allow-origin", "*");
   res.setHeader('Access-Control-Allow-Methods', "GET, POST");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
})

app.post('/', (_req :any, res :any) =>
res.json({ message: 'Hello Client' })
);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`app listening on http://localhost:${port}`) );
