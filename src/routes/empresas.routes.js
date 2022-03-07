const express = require('express');
const empresaControllador = require('../controllers/empresas.controller');
const md_autenticacion = require('../middlewares/autentificacion');
const api = express.Router();


api.post('/agregarEmpresa', md_autenticacion.Auth, empresaControllador.agregarEmpresa);
api.get('/obtenerEmpresasCreadas', md_autenticacion.Auth, empresaControllador.obtenerEmpresaUsuario);
api.put('/editarEmpresa/:idUsuario/:idEmpresa',md_autenticacion.Auth, empresaControllador.EditarEmpresa);

module.exports = api;