const mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var empleadosSchema = Schema({
    nombreEmpleado: String,
    puesto: String, 
    departamento: String,
    idEmpresa: {type: Schema.Types.ObjectId, ref:'empresas'}
});

module.exports = mongoose.model('empleados', empleadosSchema);
