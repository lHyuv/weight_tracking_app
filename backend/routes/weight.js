const express = require('express');
const weightRouter = express.Router();

const weightModel = require('../models/Weight.js');

weightRouter.route('/')
.get((req,res)=>{
    weightModel.find((err,data)=>{
        if(err){
            res.status(500).send({
                error: true,
                data: [],
                message: err
            })
        }else{
            res.status(200).send({
                error: false,
                data: data,
                message: "Successfully retrieved"
            })
        }
    })
});

weightRouter.route('/active')
.get((req,res)=>{
    weightModel.find(
        {
            "status": "Active"
        },
        (err,data)=>{
        if(err){
            res.status(500).send({
                error: true,
                data: [],
                message: err
            })
        }else{
            res.status(200).send({
                error: false,
                data: data,
                message: "Successfully retrieved"
            })
        }
    })
});

weightRouter.route('/:id')
.get((req,res)=>{
    weightModel.findById(
        req.params.id,
        (err,data)=>{
        if(err){
            res.status(500).send({
                error: true,
                data: [],
                message: err
            })
        }else{
            res.status(200).send({
                error: false,
                data: data,
                message: "Successfully retrieved"
            })
        }
    })
});

weightRouter.route('/')
.post( async (req,res)=>{
  weightModel.create(
      req.body,
      (err,data)=>{
        if(err){
            res.status(500).send({
                error: true,
                data: [],
                message: err
            })
        }else{
            res.status(200).send({
                error: false,
                data: data,
                message: "Successfully created"
            })
        }
    })
 
})

weightRouter.route('/:id')
.put( async (req,res)=>{
    weightModel.findByIdAndUpdate(req.params.id,req.body)
    .then((result)=>{
        if(result){
            res.status(200).send({
                error: false,
                data: result,
                message: "Successfully updated"
            })
        }else{
            res.status(500).send({
                error: true,
                data: [],
                message: "Something went wrong"
            })
        }
    })
    .catch((err)=>{
        res.status(500).send({
            error: true,
            data: [],
            message: err
        })        
    })
});

weightRouter.route('/reset')
.delete( (req,res)=>{
    weightModel.updateMany({}, {"status": "Inactive"})
    .then((result)=>{
        if(result){
            res.status(200).send({
                error: false,
                data: result,
                message: "Successfully deleted"
            })
        }else{
            res.status(500).send({
                error: true,
                data: [],
                message: "Something went wrong"
            })
        }
    })
    .catch((err)=>{
        res.status(500).send({
            error: true,
            data: [],
            message: err
        })        
    })
});

weightRouter.route('/:id')
.delete( (req,res)=>{
    weightModel.findByIdAndUpdate(req.params.id, {"status": "Inactive"})
    .then((result)=>{
        if(result){
            res.status(200).send({
                error: false,
                data: result,
                message: "Successfully deleted"
            })
        }else{
            res.status(500).send({
                error: true,
                data: [],
                message: "Something went wrong"
            })
        }
    })
    .catch((err)=>{
        res.status(500).send({
            error: true,
            data: [],
            message: err
        })        
    })
});



module.exports = weightRouter;