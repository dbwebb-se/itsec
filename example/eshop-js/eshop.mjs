import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { logStartUpDetailsToConsole } from './middleware/index.js';
import bodyParser from 'body-parser';
import session from 'express-session';

// Server Initialization
dotenv.config();
const app = express();
const port = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Specify the directory where your views/templates are located
app.set('views', path.join(__dirname, 'views'));

// Session variables
//app.set('trust proxy', 1) // trust first proxy
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay }
}));
app.use((req, res, next) => {
    res.locals.session = req.session;
    // res.set('Content-Security-Policy',
    //     "default-src 'self'; frame-ancestors 'self'; form-action 'self';");
    next();
});

// Local Modules
import homeRoute from './routes/homeRoute.mjs';
import productRoute from './routes/product.mjs';
import categoryRoute from './routes/category.mjs';
import userRoute from './routes/user.mjs';
import cartRoute from './routes/cart.mjs';
import orderRoute from './routes/order.mjs';
  
// Routes will be written here
app.use('/', homeRoute);
app.use('/', productRoute);
app.use('/', categoryRoute);
app.use('/', userRoute);
app.use('/', cartRoute);
app.use('/', orderRoute);

app.listen(port, logStartUpDetailsToConsole(app, port));
