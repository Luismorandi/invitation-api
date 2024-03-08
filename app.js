const express = require("express")
const fs = require('fs').promises;

const app = express()
app.use(express.json());

app.listen(3000,()=>{
    console.log("listening on port 3000")
})

app.post('/', async (req, res)=>{
   console.log(req.body)
    await fs.appendFile(`./${req.body.name_file}.txt`, `\n ${req.body.message}`, { encoding: 'utf8' });
    res.status(200).send( req.body)
})