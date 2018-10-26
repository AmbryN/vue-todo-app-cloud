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
        const { user } = req.body
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

        User.findOne({ email: user.email }, (err, DBuser) => {
            if (err) {
                next(err)
            }
            if (DBuser) {
                
                if (DBuser.validatePassword(user.password)) {
                    return res.json({ user: DBuser.toAuthJSON()})
                }
            }
            else return res.status(404).json({error: "User not found"})
        })
        
    }
}