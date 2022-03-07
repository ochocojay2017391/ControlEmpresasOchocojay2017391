const mongoose = require('mongoose');
const app = require('./app')
const usuariosController = require('./src/controllers/usuarios.controller');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ControlEmpresas', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("Se encuentra conectado a la base de datos.");
    app.listen(3000,function(){
        console.log('Hola esta base de datos se esta corriendo en el puerto 3000')
        usuariosController.UsuarioInicial();
    })
}).catch(err => console.log(err));