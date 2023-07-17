import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import helmet from "helmet";
require('dotenv').config();

/* Import Modules  */
import connection from './src/config/db.config';
import LinksRouter from './src/routes/links.route';
import Auth from './src/routes/auth.route';
import UrlRedirectRouter from './src/routes/index.route';

const PORT = process.env.PORT;
const app: express.Application = express();

app.use(helmet()); //=> Use Helmet!

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use('/api/v1/auth', Auth); //==> Authentication Router
app.use('/api/v1', LinksRouter); //==> Links Router
app.use('', UrlRedirectRouter); //=> Default Url Redirect Router


app.get('/api/v1', (req: Request, res: Response) => res.json({
    'status': 'success',
    'message': 'Welcome to Scissor'
})); //=> Home Route



connection
    .sync()
    .then(() => {
        console.log("Database successfully connected");
    })
    .catch((err) => {
        console.log("Error", err);
    });

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));