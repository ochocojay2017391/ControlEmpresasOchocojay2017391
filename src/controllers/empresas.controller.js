const Empresa = require("../models/empresas.model");
const jwt = require('../services/jwt')

function agregarEmpresa(req, res) {
  var parametros = req.body;
  var EmpresaModel = new Empresa();

  if (req.user.rol == "ADMIN") {
    if (parametros.nombreEmpresa) {
        EmpresaModel.nombreEmpresa = parametros.nombreEmpresa; 
        EmpresaModel.idAdmin = req.user.sub;
        EmpresaModel.rol = 'Empresas';

      Empresa.find({ nombreEmpresa: EmpresaModel.nombreEmpresa }, (err, empresaEncontrada) => {
        if (empresaEncontrada.length == 0) {
          
            EmpresaModel.save((err, empresaGuardada) => {
              if(parametros.obtenerToken === 'true'){
                return res.status(200).send({token: jwt.crearToken(empresaEncontrada)})
            } if (err)
              return res.status(500).send({ mensaje: "Error en la peticion" });
            if (!empresaGuardada)
              return res.status(500).send({ mensaje: "Error al guardar el empresa" });

            return res.status(200).send({ Empresa: empresaGuardada });
          })
        } else {
          return res.status(500).send({ mensaje: "Esta empresa ya esta creada en la base de datos" });
        }
      });
    } else {
      return res.status(500).send({ mensaje: "Debe rellenar todos los campos" });
    }
  } else {
    return res.status(500).send({ mensaje: "No esta Autorizado" });
  }
}

function obtenerEmpresaUsuario(req, res) {
  Empresa.find({ idAdmin: req.user.sub }, (err, empresaCreadas) => {
    if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
    if (!empresaCreadas)
      return res.status(500).send({ mensaje: "Error al obtener los Cursos" });

    return res.status(200).send({ Empresa: empresaCreadas });
  }).populate("idAdmin", "nombre usuario");
}

function EditarEmpresa(req,res){
    var idUser = req.params.idUsuario;
    var idEmpresa = req.params.idEmpresa;
    var parametros = req.body;
    if(req.user.rol == 'ADMIN'){
        if(idUser !== req.user.sub) return res.status(500).send({mensaje: 'no puede editar otros usuarios'});
        Empresa.findByIdAndUpdate(idEmpresa, parametros,{new:true}, (err, empresaActualizada) =>{
        if (err) return res.status(500).send({mensaje:'Error en la peticion'});
        if (!empresaActualizada) return res.status(404).send({mensaje: 'Error al Editar el Usuario'})
        return res.status(200).send({usuario: empresaActualizada});
    })

    }else{
        return res.status(500).send({mensaje:"Usted no esta autorizado"});
    }
}



module.exports = {
  agregarEmpresa,
  obtenerEmpresaUsuario,
  EditarEmpresa
};
