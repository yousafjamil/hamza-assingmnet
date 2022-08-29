const { User, validate } = require('../models/user');

const router = require('express').Router();

router.get('/signup', (req, res) => {
    const error = req.flash('error')
    res.render('signup.ejs', { error })
});


router.post('/register', async (req, res) => {
    try {

        const { error } = validate(req.body);
        if (error) {
            req.flash('error', error.details[0].message);
            return res.redirect('/signup')
        }
        const user = await User.findOne({ name: req.body.name });
        if (user) {
            req.flash('error', 'user Already Exist, please login ');
            return res.redirect('/signup')
        };

        const saveuser = await User.create(req.body);
        req.session.user = saveuser
        console.log(req.session.user)
        req.flash('error', 'user successfully Registered.');
        return res.redirect('/')
    } catch (error) {
        req.flash('error', 'Some Went wrong.');
        return res.redirect('/signup')
    }


})


// login
router.get('/', (req, res) => {
    const error = req.flash('error')
    res.render('login.ejs', { error })
});

router.post('/login', async (req, res) => {
    // const error = req.flash('error')
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
        req.flash('error', 'user with this name does not exist ')
        return res.redirect('/')
    } else if (user.password != req.body.password) {
        req.flash('error', 'Invalid password ')
        return res.redirect('/')
    }

    else {
        req.session.user = user
        if (req.session.user.isAdmin === true) {
            return res.redirect('/dashboard')
        } else {
            res.redirect('/about')
        }


    }
});


// about us page
router.get('/about', (req, res) => {
    res.render('about.ejs')
});


// dashboard
router.get('/dashboard', (req, res) => {
    const user = req.session.user
    res.render('dashboard.ejs', { user })
});

// our service
router.get('/services', (req, res) => {
    res.render('services.ejs')
});



// dashboard
router.get('/user/profile', async (req, res) => {
    const user = req.session.user

    res.render('profile.ejs', { user })
});



module.exports = router;
