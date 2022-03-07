const express = require('express');
const empleadoControllador = require('../controllers/empleados.controller');
const md_autenticacion = require('../middlewares/autentificacion');
const api = express.Router();


api.post('/agregarEmpleado', md_autenticacion.Auth, empleadoControllador.agregarEmpleado);
api.get('/obtenerEmpleadoEmpresa', md_autenticacion.Auth, empleadoControllador.obtenerEmpleadoEmpresa);
api.put('/editarEmpleado/:idEmpresa/:idEmpleado',md_autenticacion.Auth, empleadoControllador.editarEmpleado);
//api.delete('/eliminarEmpleado/:idEmpleado', md_autenticacion.Auth, empleadoControllador.eliminarEmpleado);
module.exports = api;