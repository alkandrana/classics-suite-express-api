import express from 'express';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from '../swagger.config.js'
import opusRouter from './routes/opus.router.js';
import authorRouter from "./routes/author.router.js";

const app = express();
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(express.json());

app.use("/works", opusRouter);
app.use("/authors", authorRouter);

app.get('/',function(req, res) {
    res.send("Hello from Node API Server");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000, docs at /api-docs');
});
