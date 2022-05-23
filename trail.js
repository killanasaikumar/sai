const Joi = require('joi')
const express = require('express')
const req = require('express/lib/request')
const { min } = require('joi/lib/types/array')
const app = express()
const port = 9000
 app.use(express.json())
const todos=[
    {id:1,name:"HTML"},
    {id:2,name:"java"},
    {id:3,name:"php"}

]
 
app.get('/api/todos',(req,res)=>{
    res.send(todos)
})
app.get('/api/todos/:id',(req,res)=>{
    const single_res = todos.find(c=>c.id === parseInt(req.params.id))
    if(!single_res) return res.status(404).send("worg id")
    res.send(single_res)
})

app.post('/api/todos',(req,res)=>{
    const schema = {
        name:Joi.string().min(3).required()
    }

    const result= Joi.validate(req.body,schema)
    if (result.error){
        return res.status(404).send(result.error.details[0].message)
    }
    const stodo = {
        id:todos.length +1,
        name:req.body.name
    }
    todos.push(stodo)
    res.send(stodo)

})

app.listen(port, console.log("working papeya"))

