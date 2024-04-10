
import express from 'express'
import {connect} from "./dbconnect.js"

import{ Livro} from "../models/livro.js"
const connection = await connect();
connection.on("error",(erro)=>{
    console.log("Erro ao conectar o banco de dados",erro)
})

connection.once("open",()=>{
    console.log("Sucesso ao conectar o banco de dados")
})


export const App = express() 
App.use(express.json())


App.get("/livros", async(req,res)=>{
    const listalivros = await Livro.find({})
    res.status(200).json(listalivros)
})

App.post("/inserirLivros",async(req,res)=>{
    const novoLivro = (req.body);
    try{
        await Livro.create(novoLivro);
        res.status(201).json(novoLivro);
    } catch(error){
        res.status(500).send(error)
    }
})

App.delete("/deletarLivro/:id", async(req,res)=>{
    try{
        const id = req.params.id;
        const livroExcluido = await Livro.findByIdAndDelete(id)
        if(livros){
            res.status(200).send("Livro excluido com sucesso",livroExcluido)
        }else{
            res.status(500).send(error)
        }
    }catch(error){
        res.status(500).send(error)
    }
})

App.path("/atualizarlivr:id", async (req,res)=>{
    try{
        const id = req.params.id;
        const livroatualizado = await Livro.findByIdAndUpdate({_id:id},
            req.body,{new : true}
        );
    }
    if(livroatualizado){
        res.status(200).json(livroatualizado)
    }else{
        res.status(404).send("livro não enncontrado")
    } catch(error){
        res.status(500).send(error);
    }
})