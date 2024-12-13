import { Router } from 'express';
import { verifyPassword, createUserProfile, updateUserProfile, getUserData, getUserDataById } from '../controllers/userController.mjs';

const router = Router();

router.get('/user/login', (req, res) => {
    let data = {
        title: 'Logga in',
        message: ''
    };

    res.render('user/userLogin', data);
});

router.post('/user/login', async (req, res) => {
    let data = {
        title: 'Logga in',
        message: 'Felaktig inloggning!',
    };

    if (req.body.submitLogin) {
        const userOk = await verifyPassword(req.body.loginEmail, req.body.loginPassword);
        if (userOk) {
            data.message = "Välkommen " + req.body.loginEmail;
            req.session.user = req.body.loginEmail;
            req.session.items = [];
            req.session.save();
            return res.redirect('userProfile');
        }
        res.render('user/userLogin', data);
    } else if (req.body.createUser)
        res.render('user/userCreate', data); 

});

router.get('/user/create', (req, res) => {
    let data = {
        title: 'Skapa användare',
        message: ''
    };

    res.render('user/userCreate', data);
});

router.post('/user/create', async (req, res) => {
    let data = {
        title: 'Skapa användare',
        message: 'Skapandet av användare misslyckades!',
    };
    let result;
    const user = {
        firstname: req.body.firstname,
        surname: req.body.surname,
        phone: req.body.phone,
        email: req.body.email,
        gender: (req.body.gender === "Kvinna" ? 0 : 1),
        address: req.body.address,
        postcode: req.body.postcode,
        city: req.body.city,
        role: 0,
        password: req.body.password,
        passwordAgain: req.body.passwordAgain
    };

    if (req.body.createUserProfile && req.body.password === req.body.passwordAgain) {
        let user_created = [];
        user_created = await getUserData(user.email);
        if (user_created !== undefined && user_created.length === 0) {
            result = await createUserProfile(user);
            if (result) {
                res.redirect('login');
            } else {
                data.title = 'Skapa användare';
                data.message = 'Skapandet av användare misslyckades!';

                res.render('user/userCreate', data);
            }
        } else {
            data.title = 'Skapa användare';
            data.message = 'Skapandet av användare misslyckades!';

            res.render('user/userCreate', data);
        }
    }
});

router.get('/user/update', async (req, res) => {
    let data = {
        title: 'Uppdatera användare',
        message: ''
    };

    const result = await getUserData(req.session.user);
    if (result) {
        data.res = result[0];

        res.render('user/userUpdate', data);
    } else {
        res.redirect('/');
    }
});

router.post('/user/update', async (req, res) => {
    let data = {
        title: 'Uppdatera användare',
        message: 'Uppdatera användare misslyckades!',
    };
    const user = {
        firstname: req.body.firstname,
        surname: req.body.surname,
        phone: req.body.phone,
        email: req.body.email,
        gender: (req.body.gender === "Kvinna" ? 0 : 1),
        address: req.body.address,
        postcode: req.body.postcode,
        city: req.body.city,
        role: 0
    };

    if (req.body.updateUserProfile) {
        data.lastId = await updateUserProfile(parseInt(req.body.userId), user);
        data.message = '';
        if (data.lastId) {
            const result = await getUserDataById(req.body.userId);
            data.res = result[0];
            data.message = "";

            res.render('user/userProfile', data);
        } else {
            data.title = 'Uppdatera användare';
            data.message = 'Uppdateringen av användare misslyckades! Försök igen!';
            const result = await getUserDataById(req.body.userId);
            data.res = result[0];

            res.render('user/userUpdate', data);
        }
    }
});

router.get('/user/userProfile', async (req, res) => {
    let data = {
        title: 'Profil',
        message: 'Något gick fel, prova att logga in',
        res: ''
    };

    if (req.session.user) {
        const result = await getUserData(req.session.user);
        data.res = result[0];
        data.message = "";
    }

    res.render('user/userProfile', data);
});

router.get('/user/logout', (req, res) => {
    req.session.user = null;
    req.session.items = null;
    req.session.currentItem = null;
    
    res.redirect('login');
});

export default router;
