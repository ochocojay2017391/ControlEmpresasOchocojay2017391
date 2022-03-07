const express = require('express');
const cors = require('cors');
var app = express();
//PDF
const PdfPrinter = require("pdfmake"); 
const fs = require("fs");

const fonts = require("./fonts.js");
const styles = require("./styles.js");
const {content} = require("./pdfContents");

let docDefinition = {
    content: content, 
    styles:styles
};

const printer = new PdfPrinter(fonts); 

let pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream("pdfs/pdfTest.pdf"));
pdfDoc.end();

//PDF

const UsuarioRutas = require('./src/routes/usuarios.routes');
const EmpresasRutas = require('./src/routes/empresas.routes');
const EmpleadoRutas = require('./src/routes/empleados.routes');
//const AsignacionesRutas = require('./src/routes/asignaciones.routes');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());

app.use('/api', UsuarioRutas, EmpresasRutas, EmpleadoRutas);

module.exports = app;