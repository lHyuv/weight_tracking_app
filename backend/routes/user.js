const express = require('express');
const userRouter = express.Router();

const userModel = require('../models/User.js');

userRouter.route('/')
.get((req,res)=>{
    userModel.find((err,data)=>{
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

userRouter.route('/active')
.get((req,res)=>{
    userModel.find(
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

userRouter.route('/find/:username')
.get((req,res)=>{
    userModel.find(
        {"user_name": req.params.username},
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


userRouter.route('/:id')
.get((req,res)=>{
    userModel.findById(
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


userRouter.route('/')
.post( async (req,res)=>{
  userModel.create(
      req.body,
      (err,data)=>{
        if(err){ //console.log(err)
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

userRouter.route('/:id')
.put( async (req,res)=>{
    userModel.findByIdAndUpdate(req.params.id,req.body)
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

userRouter.route('/reset')
.delete( (req,res)=>{
    userModel.updateMany({}, {"status": "Inactive"})
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

userRouter.route('/:id')
.delete( (req,res)=>{
    userModel.findByIdAndUpdate(req.params.id, {"status": "Inactive"})
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



module.exports = userRouter;