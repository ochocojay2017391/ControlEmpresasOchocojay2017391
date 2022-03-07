const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmpresaSchema = Schema({
    nombreEmpresa: String,
    rol: String,
    idAdmin : {type: Schema.Types.ObjectId, ref:'usuarios'}
});

module.exports = mongoose.model('empresas', EmpresaSchema);