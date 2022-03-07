const Empleado = require("../models/empleados.model");


function agregarEmpleado(req, res) {
  var parametros = req.body;
  var EmpleadoModel = new Empleado();

  if (req.user.rol == "Empresa", "Empresas") {
    if (parametros.nombreEmpleado) {
        EmpleadoModel.nombreEmpleado = parametros.nombreEmpleado;
        EmpleadoModel.puesto = parametros.puesto;
        EmpleadoModel.departamento = parametros.Departamento; 
        EmpleadoModel.idEmpresa = req.user.sub;
       
        Empleado.find({ nombreEmpleado: EmpleadoModel.nombreEmpleado }, (err, empleadoEncontrado) => {
        if (empleadoEncontrado.length == 0) {
            EmpleadoModel.save((err, empleadoGuardado) => {
            if (err)
              return res.status(500).send({ mensaje: "Error en la peticion" });
            if (!empleadoGuardado)
              return res.status(500).send({ mensaje: "Error al guardar el empleado" });

            return res.status(200).send({ Empresa: empleadoGuardado });
          });
        } else {
          return res.status(500).send({ mensaje: "Este empleado ya existe en la base de datos" });
        }
      });
    } else {
      return res.status(500).send({ mensaje: "Debe rellenar todos los campos" });
    }
  } else {
    return res.status(500).send({ mensaje: "No esta Autorizado" });
  }
}

function obtenerEmpleadoEmpresa(req, res) {
  Empleado.find({ idEmpresas: req.user.sub }, (err, empleadosCreados) => {
    if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
    if (!empleadosCreados)
      return res.status(500).send({ mensaje: "Error al obtener los Empleados" });

    return res.status(200).send({ Empleado: empleadosCreados });
  }).populate("idEmpresa", "nombre empresa");
}


function editarEmpleado(req,res){
    var idEmpresa = req.params.idEmpresa;
    var idEmpleado = req.params.idEmpleado;
    var parametros = req.body;
    if(req.user.rol ==  "Empresas", "Empresa"){
        if(idEmpleado !== req.user.sub) return res.status(500).send({mensaje: 'no puede editar empleados de otra empresa'});
        Empleado.findByIdAndUpdate(idEmpresa, parametros,{new:true}, (err, empleadoActualizado) =>{
        if (err) return res.status(500).send({mensaje:'Error en la peticion'});
        if (!empleadoActualizado) return res.status(404).send({mensaje: 'Error al Editar empleado'})
        return res.status(200).send({empleado: empleadoActualizado});
    })
    }else{
        return res.status(500).send({mensaje:"Usted no esta autorizado"});
    }
}
/*
function eliminarEmpleado(req,res){
  var idEmpleado = req.params.idEmpleado;
  if(idEmpleado !== req.user.sub) return res.status(500).send({mensaje: 'no puede eliminar este empleado'});
  Empleado.findByIdAndDelete(idEmpleado, (err, empleadoEliminado) =>{
      if (err) return res.status(500).send({mensaje:'Error en la peticion'});
      if (!empleadoEliminado) return res.status(404).send({mensaje: 'Error al Eliminar el empleado'})
      return res.status(200).send({empleado: empleadoEliminado});
  }) 
}

*/

module.exports = {
    agregarEmpleado,
    obtenerEmpleadoEmpresa,
    editarEmpleado,
    //eliminarEmpleado
};
