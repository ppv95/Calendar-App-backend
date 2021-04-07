/*
Rutas de Uusairos /Auth
host + /api/auth
*/

const {Router} = require('express');
const {check} = require('express-validator');
const { createUser,loginUser, renewToken } = require('../controllers/auth');
const { validateField } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/jwt-validate');

const router = Router();

router.post('/new',[
    check('name','name is required').not().isEmpty(),
    check('email','email is required').isEmail(),
    check('password','password must be 6 caracter long').isLength({min:6}),
    validateField
],createUser);

router.post('/',[
    check('email','email is required').isEmail(),
    check('password','password must be 6 caracter long').isLength({min:6}),
    validateField
],loginUser);

router.get('/renew',validateJWT,renewToken);


module.exports = router;

