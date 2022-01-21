const { respomse } = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

/** Models */
const Usuario = require("../models/usuario");

/** Helpers */
const { generarJWT } = require("../helpers/jwt");


const creaUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const existEmail = await Usuario.findOne({ email});
        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            })
        }

        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        // Geeerar  JWT
        const token = await generarJWT(usuario.id);
    
        res.json({
            ok: true,
            usuario,
            token
        });   
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error general'
        })
    }

}

const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
        return res.status(404).json({
            ok: false,
            msg: 'Email no encontrado'
        });
    }

    // Validar password
    const validPassword = bcrypt.compareSync( password, usuarioDB.password);
    if (!validPassword) {
        return res.status(400).json({
            ok: false,
            msg: 'La contraseña no es valida'
        });
    }

    // Generar JWT
    const token = await generarJWT(usuarioDB.id);

    res.json({
        ok: true,
        usuarioDB,
        token
    }); 
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error general en el servidor'
        })        
    }
}

const renewToken = async (req, res = response) => {

    try {
        const uid = req.uid;

        // Generar JWT
        const token = await generarJWT(uid);
        
        const usuarioDB = await Usuario.findById(uid).exec();
    
        res.json({
            ok: true,
            usuarioDB,
            token
        });   
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error general en el servidor'
        })
    }
}

module.exports = {
    creaUsuario,
    loginUsuario,
    renewToken
}