//express
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/TodoTasks')
.then( () => console.log("connected"))
.catch((err) => console.log("not connected",err))
const todoSchema = new mongoose.Schema({
title: String,
description: String
});

const todoModel = mongoose.model('task',todoSchema)
app.post('/todo',async (req,res)=>{
    const{title,description} = req.body;
    try{
        const newtodo = new todoModel({title,description});
        await newtodo.save();
        res.status(200).json(newtodo);
    }catch{
        console.log("error")
        res.status(500);
    }
})
app.get('/todo',async (req,res)=>{
   try{
    const todo = await todoModel.find()
    res.json(todo)
    console.log("fetched data")
   }catch{
    console.log("erroe");
    res.status(500);
   }
})
app.put('/todo/:id',async (req,res)=>{
    
    try{
        const{title,description} = req.body;
        const id = req.params.id;
        const u_todo = await todoModel.findByIdAndUpdate(id,{title,description});
        if(u_todo){
            res.json(u_todo)
        }else{
            res.status(404).json({message :"error"})
        }  
    }catch{
        console.log(erorr);
        res.status(500);
    }
})
app.delete('/todo/:id',async (req,res)=>{
     try{
        const id = req.params.id;
        await todoModel.findByIdAndDelete(id);
        res.status(200).end();
    }catch{
        console.log("unable to delete");
        res.status(500).send("Failed to delete");
    }
});
const port = 4000;
app.listen(port,()=>{
    console.log("port :", port);
});
