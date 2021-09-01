import { AuthenticationError } from './../services/errorClass.js';

export default function roleCheck(req, res, next) {
    console.log('rolecheck middlevaere');
        if (!req.user.isAdmin) {
            const err = new AuthenticationError(`Csak adminok számára...`);
            return next(err);
    };
    next();
}