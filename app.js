const express = require("express")
const fs = require('fs').promises;
const path = require('path')

const app = express()
app.use(express.json());

app.listen(3000,()=>{
    console.log("listening on port 3000")
})

app.get('/', async (req, res)=>{
    const pathData = path.join(__dirname, './data.txt')
    const texto= await fs.readFile(pathData, 'utf8' );
    const lineas = texto.split('\n');

    const WORD_DENEGADOS = "denegados";
    const WORD_ACEPTARON = "aceptaron"
    
    const denegados = lineas.filter(cadena => cadena.includes(WORD_DENEGADOS));
    const aceptados = lineas.filter(cadena => cadena.includes(WORD_ACEPTARON))

    const response = {
        denegados,
        aceptados
    }
    res.status(200).send( response)
})

app.post('/', async (req, res)=>{
     await fs.appendFile(`./data.txt`, `\n ${req.body.status} : ${req.body.message}`, { encoding: 'utf8' });
     res.status(200).send( req.body)
 })
