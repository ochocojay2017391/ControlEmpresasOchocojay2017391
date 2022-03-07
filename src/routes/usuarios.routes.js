const express = require('express');
const usuariosController = require('../controllers/usuarios.controller');
const md_autenticacion = require('../middlewares/autentificacion');
const api= express.Router();


api.post('/registrarEmpresa', usuariosController.RegistrarEmpresa);
api.post('/login', usuariosController.Login);
api.put('/editarUsuario/:idUsuario',md_autenticacion.Auth, usuariosController.EditarUsuario);
api.delete('/eliminarUsuario/:idUsuario',md_autenticacion.Auth, usuariosController.EliminarUsuario);

module.exports = api;