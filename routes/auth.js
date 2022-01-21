/**
 * path: api/login
 */

const { Router} = require('express');
const { check } = require('express-validator');

const { creaUsuario, loginUsuario, renewToken } = require('../controllers/auth');
const { validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new', [
    check('nombre', 'EL nombre es obligatorio').not().isEmpty(),
    check('email', 'EL correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validarCampos
], creaUsuario);

router.post('/', [
    check('email', 'EL correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validarCampos
], loginUsuario);

router.get('/renew', validarJWT, renewToken);

module.exports = router;