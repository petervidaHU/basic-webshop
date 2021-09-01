import jwt from 'jsonwebtoken';
import { AuthenticationError } from './../services/errorClass.js';

export default (req, res, next) => {
    let token = null;

    if (
        req.headers.authorization
        && req.headers.authorization.startsWith('Bearer')
    ) {
        [, token] = req.headers.authorization.split(' ');
    }
    
    if (token === null || token === 'null' || token === '' || !token) {
        const err = new AuthenticationError('No token found.');
        return next(err);
    }
    req.user = jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
        if (err) {
            const error = new AuthenticationError('invalid Token, verification error');
            return next(error);
        }
        return result;
    });
    //console.log('tokencheck:',req.user)
    return next();
};