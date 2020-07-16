const router = require('express').Router();
let User = require('../models/user.model');
let cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.use(cors());

process.env.SECRET_KEY = 'secret';

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const date = req.body.date;

    const newUser = {
        username,
        email,
        password,
        date
    }
    User.findOne( {
        username: req.body.username
    })
        .then(user => {
            if(!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    newUser.password = hash;
                    User.create(newUser)
                    .then(user => {
                        res.json({status: user.username + ' registered!'});
                    })
                    .catch(err => res.status(400).json('Error: ' + err));
                })
            } else {
                res.json({error: "User already exists"});
            }
        })
        .catch(err => {
            res.send('error: ' + err);
        })
});

router.post('/login', (req, res) => {
    User.findOne({
        username: req.body.username
    })
    .then(user => {
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                const payload = {
                    _id : user._id,
                    username : user.username,
                    email: user.email
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token);
            } else {
                res.json({error: "User does not exist"});
            }
        } else {
            res.json({error: "User does not exist"})
        }
    })
    .catch(err => {
        res.send('error: ' + err);
    })
})

router.get("/profile", (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    User.findOne({
        _id: decoded._id
    })
    .then(user => {
        if(user) {
            res.json(user)
        } else {
            res.send("User does not exist")
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})

module.exports = router;