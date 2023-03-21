import express from 'express';
import session from 'express-session';

const app = express();
const port = 1337;

import { accountCreate, accountUpdate, accountDelete, userUpdate } from './src/functions.js';
import { loginUser, loginError, loginSuccess, logout, handleSignup, generateOneUserWithAccounts } from './src/functions.js';
import { generateAdminView, processAdminView, getAll, transfer, makeTransfer, makeAction } from './src/functions.js';
let manageFunctions = {
    account_create: accountCreate,
    account_update: accountUpdate,
    account_delete: accountDelete,
    user_update: userUpdate
};

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(session({
    key: "user_id",
    secret: 'nerds-will-take-over-the-planet',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }

}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

function userAuth(req, res, next) {
    if (req.session.user === undefined) {
        req.session.flash = "You have to login first.";
        res.redirect(302, '/login');
    } else if (req.session.user && req.session.user.name === "admin") {
        req.session.flash = "Admin do not have any accounts.";
        res.redirect(302, '/login');
    } else {
        return next();
    }
}

function adminAuth(req, res, next) {
    if (req.session.user && req.session.user.name != "admin") {
        req.session.flash = "You are not admin.";
        res.redirect(302, '/login');
    } else {
        return next();
    }
}

app.get('/', (req, res) => res.render('pages/index'));

app.get(['/manage', '/manage/:what/:action'], userAuth, async (req, res) => {
    if (req.params.what && req.params.action) {
        let useFunction = req.params.what+'_'+req.params.action;
        
        manageFunctions[useFunction](req, res);
    } else {
        generateOneUserWithAccounts(req, res);
    }
});

app.get(['/admin-view', '/admin-view/:id'], adminAuth, async (req, res) => generateAdminView(req, res));
app.get('/process-admin-view', adminAuth, async (req, res) => processAdminView(req, res));
app.get('/login', (req, res) => loginUser(req, res));
app.get('/login-error', (req, res) => loginError(req, res));
app.get('/login-success', async (req, res) => loginSuccess(req, res));
app.get('/transfer', userAuth, async (req, res) => transfer(req, res));
app.get('/process-transfer', userAuth, async (req, res) => makeTransfer(req, res));
app.get('/process-action', userAuth, async (req, res) => makeAction(req, res));
app.get('/logout', (req, res) => logout(req, res));
app.get('/signup', (req, res) => res.render('pages/signup'));
app.get('/process-signup', async (req, res) => handleSignup(req, res));
app.get('/get-all', async (req, res) => getAll(res));


app.use(function (req, res) {
    res.status(404).render('pages/404');
});


app.listen(port, () => console.log(`Project app listening on port ${port}!`));
