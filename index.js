const Joi = require('joi') //class
const express = require('express') // function
const app = express() // calling function stored in app obj
const port =  5000

app.use(express.json()) 
//db
const todos=[
    {id:1,name:"HTML"},
    {id:2,name:"java"},
    {id:3,name:"php"}

]

//read todos and single todo
app.get('/api/todos',(req,res)=>{
    res.send(todos)
})
app.get('/api/todos/:id',(req,res)=>{
    const single_todo = todos.find(c=> c.id === parseInt(req.params.id))
    if (!single_todo) res.status(404).send("id is not there")
    res.send(single_todo)
    
})

//create a new todos
app.post('/api/todos',(req,res)=>{
    const schema = {
        name : Joi.string().min(3).required()
    };
    const result=Joi.validate(req.body,schema)
   // const result = Joi.validate(req.body.name,schema)
    console.log(result)
    if(result.error){
        res.status(400).send(result.error.details[0].message)
        return ;
    }
   
    const add_todo={
        id:todos.length+ 1,
        name:req.body.name     
    }
    todos.push(add_todo)
    res.send(todos)
})


app.listen(port,()=>{
    console.log(`WORKING PORT IN ${port}`)
})
console.log(Joi)
