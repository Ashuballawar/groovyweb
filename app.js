const express=require('express');
const mongoose=require('mongoose')
var cors = require('cors')
const bodyParser=require('body-parser')


const app=express();





const userroutes=require('./routes/admin')
const adminroutes=require('./routes/admin')





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

