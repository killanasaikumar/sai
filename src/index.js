const express= require ("express")
const app = express()
const Joi =require('joi')
const mongoose = require('mongoose')

require('./db/deta')
const ms= require('./model/c-model')

app.use(express.json());




app.post('/',async (req,res)=>{
    
    const result = await ms.gatevalid(req.body)
    
    if(result.error){
        res.status(400).send(result.error.details[0].message)
        return ;
    }
    
     const doc_validate = ms.ValidateC
     const id_val = ms.ValidateC.length + 1
     console.log(id_val)

     
     let corses1 = new doc_validate({ 
        name: req.body.name,
        id: id_val
      });
      corses1 = await corses1.save()

    /*const add_todo={
        id:todos.length+ 1,
        name:req.body.name     
    }
    todos.push(add_todo)*/

    res.send(corses1)
})

// read file 
app.get('/', async(req,res)=>{
    const result = await ms.ValidateC.find()
    res.send(result)
   
})

app.get('/:id', async (req, res) => {
    const course = await ms.ValidateC.findById(req.params.id);
  
    if (!course) return  res.status(404).send('not there.');
  
    res.send(course);
  });

//delete
app.delete('/:id',async (req, res) =>{
    const course = await ms.ValidateC.findByIdAndRemove(req.params.id);

    if (!course) return  res.status(404).send('not there.');
    
  
    res.send(course);
})

//put
app.put('/:id', async (req, res) => {

    const result = await ms.gatevalid(req.body)
    if(result.error){
        res.status(400).send(result.error.details[0].message)
        return ;
    }

    const course = await ms.ValidateC.findByIdAndUpdate(req.params.id,
        { 
          name: req.body.name,
        });
    
    if (!course) return  res.status(404).send('not there.');
    res.send(course)

  });

  

    





    




const port = 7000
app.listen(port,()=> console.log(port))
console.log(ms.ValidateC)

