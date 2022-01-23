import express from 'express';

var app = express();

app.use(express.json());

//Setup CORS requests
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

const port = process.env.PORT || '2222';

app.listen(port, () => console.log(`app listening on port ${port}`) );

export default app;
