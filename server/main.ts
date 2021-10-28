import express from 'express';

const app = express();

app.get('/', (_req :any, res :any) =>
    res.json({ message: 'Hello Client' })
);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`app listening on http://localhost:${port}`) );