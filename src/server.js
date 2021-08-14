const express= require('express')
const app= express()
const port= process.env.PORT || 5010

// variable ambient
require('dotenv').config()

// conexão com o servidor
const { Pool } = require('pg')
const pool = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE
})
pool.connect()

// middleware
app.use(express.static('public'))
app.use(express.urlencoded({extend:true}))
app.use(express.json())


// APLICATION
app.get('/', (req, res)=>{
    res.sendFile('index.html')
})

// API
app.get('/api', async(req, res)=>{
     try {
         const api= await pool.query(`select * from farmacia`)
         res.json(api.rows) 
     } catch (error) {
         console.log('ERROR AO CONECTAR COM O DB', error)
     }
})

// POST 
app.post('/api/add', async (req,res)=>{
    try {

    const {nome, marca, ref, quant} = req.body    
    const sql= `INSERT INTO farmacia (nome, marca, referencia, quant) 
    values ('${nome}', '${marca}', '${ref}', '${quant}')`
    const addItems= await pool.query(sql)
     res.redirect('/')

    }catch (error) {
      throw error
    }
})

app.listen(port, (err) => {
     if(!err){
         console.log('SERVER ON', `http://localhost:${port}`)
     }else{
         throw err
     }
})