const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');

module.exports = {

    //POST new user route (optional, everyone has access)
    createNewUser: (req, res, next) => {
        const { body: { user } } = req;

        if(!user.email) {
            return res.status(422).json({
            errors: {
                email: 'is required',
            },
            });
        }

        if(!user.password) {
            return res.status(422).json({
            errors: {
                password: 'is required',
            },
            });
        }

        if(user.password != user.confirmation) {
            return res.status(422).json({
            errors: {
                confirmation: 'doesn\'t match',
            },
            });
        }

        const finalUser = new User(user);

        finalUser.setPassword(user.password);

        return finalUser.save()
            .then(() => res.json({ user: finalUser.toAuthJSON() }));
    },

    //POST login route (optional, everyone has access)
    loginUser: (req, res, next) => {
        const { body: { user } } = req;

        if(!user.email) {
            return res.status(422).json({
            errors: {
                email: 'is required',
            },
            });
        }

        if(!user.password) {
            return res.status(422).json({
            errors: {
                password: 'is required',
            },
            });
        }

        return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
            if(err) {
            return next(err);
            }

            if(passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return res.json({ user: user.toAuthJSON() });
            }

            return status(400).info;
        })(req, res, next);
    }
}