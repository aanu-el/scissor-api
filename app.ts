import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import connection from './src/config/db.config';
import LinksRouter from './src/routes/links.route';
import Auth from './src/routes/auth.route';
require('dotenv').config();

const app: express.Application = express();
const PORT = process.env.SERVER_PORT;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use('/api/v1/auth', Auth); //==> Authentication
app.use('/api/v1', LinksRouter);


app.get('/api/v1', (req: Request, res: Response) => res.json({
    'status': 'success',
    'message': 'Welcome to Scissor'
}))



connection
    .sync()
    .then(() => {
        console.log("Database successfully connected");
    })
    .catch((err) => {
        console.log("Error", err);
    });

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));