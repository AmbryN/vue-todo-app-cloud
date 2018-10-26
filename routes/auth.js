const passport = require('passport')

module.exports = {
    required: passport.authenticate('jwt', {session: false})
}
