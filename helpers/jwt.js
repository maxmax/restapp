const expressJwt = require('express-jwt');
const config = require('../config.json');
const userService = require('../services/user');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register',
            // '/taxonomy'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};

//

// function validateUser(req, res, next) {
//  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
//    if (err) {
//      res.json({status:"error", message: err.message, data:null});
//    }else{
//      // add user id to request
//      req.body.userId = decoded.id;
//      next();
//    }
//  });
//
// }
