const express=require('express');
const mongoose=require('mongoose')
var cors = require('cors')
require('dotenv').config()
const bodyParser=require('body-parser')
const path=require('path')

const app=express();





const adminroutes=require('./routes/admin')
const userroutes=require('./routes/user')





app.use(cors());


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());




app.use('/user',userroutes)
app.use('/admin',adminroutes)



app.use((req,res)=>{
    console.log(req.url)
   
    res.sendFile(path.join(__dirname,`view/${req.url}`))
})







mongoose.connect(process.env.MONGODB_STRING)
.then(result=>{
   
         console.log('connected')
        app.listen(3000)
    
}).catch(err=>{
    console.log(err)
})

