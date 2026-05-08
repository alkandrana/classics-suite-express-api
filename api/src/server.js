import express from 'express';
import cors from 'cors';
import authorRouter from './routers/author.router.js';
import opusRouter from './routers/opus.router.js';
import lineRouter from './routers/line.router.js';
import languageRouter from './routers/language.router.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/authors', authorRouter);
app.use('/works', opusRouter);
app.use('/lines', lineRouter);
app.use('/languages', languageRouter);

app.get('/', (req, res) => {
    res.send("Welcome to the database!");
});


app.listen(3000, () => {
    console.log('Server running on port 3000!');
});