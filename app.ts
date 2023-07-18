import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import helmet from "helmet";
const Sentry = require('@sentry/node')
require('dotenv').config();

/* Import Configs  */
import connection from './src/config/db.config';
import { client } from './src/config/redis.config';
import { Limiter } from './src/config/rate-limit.config';

/* Import Modules  */
import LinksRouter from './src/routes/links.route';
import Auth from './src/routes/auth.route';
import UrlRedirectRouter from './src/routes/index.route';


const PORT = process.env.PORT;
const app: express.Application = express();

// ---------- Sentry Config ----------
const SENTRY_DSN = process.env.SENTRY_DSN;
Sentry.init({ dsn: SENTRY_DSN });
app.use(Sentry.Handlers.requestHandler());

app.use(helmet()); //=> Use Helmet!

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(Limiter) //=> Apply the rate limiting middleware to all requests

app.use('/api/v1/auth', Auth); //==> Authentication Router
app.use('/api/v1', LinksRouter); //==> Links Router
app.use('', UrlRedirectRouter); //=> Default Url Redirect Router


app.get('/api/v1', (req: Request, res: Response) => res.json({
    'status': 'success',
    'message': 'Welcome to Scissor'
})); //=> Home Route

/* Database Connection */
connection
    .sync()
    .then(() => {
        console.log("Database successfully connected");
    })
    .catch((err) => {
        console.log("Error", err);
    });


/* Redis Connection for caching */
client.on('ready', () => {
    console.log('redis is connected');
});

client.on('error', (err) => {
    console.log('redis is disconnected: ', err);
});

(async () => {
    try {
        await client.connect();
    } catch (error) {
        console.error('error while connecting redis', error);
    }
})();

// --------- Sentry Error Handler ------------
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err: any, req: Request, res: any, next: NextFunction) {
    res.statusCode = err.status || 500;
    res.json({
        message: err.message,
        sentry_error_id: res.sentry
    })
})


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));