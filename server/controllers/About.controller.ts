import { Request,Response } from "express";
import evalidate from 'evalidate'
import AboutService from "../services/About.service";
import { BadRequestError, Error, NotFoundError } from "../errors/Error";
import { About } from "../models/About";


class AboutController{

    static create(req:Request,res:Response) {
        const Schema=new evalidate.schema({
            content:evalidate.date().required(),
            user_id:evalidate.number().required(),
        })

        const payload=req.body;
        const result=Schema.validate(payload);

        if(result.isValid){
            AboutService.create(payload)
            .then((result)=>res.status(201).json(true))
            .catch((error)=>res.status(error.statusCode).json(error.payload));  
        }else{
            let error= new BadRequestError(result.errors)
            res.status(error.statusCode).json(error.payload);
        }

    }

    static findAll(req:Request,res:Response){
        AboutService.findAll({})
        .then((result:About[]|[])=>res.status(200).json(result))
        .catch((error:Error)=>res.status(error.statusCode).json(error.payload));
    }

    static findById(req:Request,res:Response){
        const id=req.params.id;
        AboutService.findById(id)
        .then((result:About|{})=>{
            if(result){
                res.status(200).json(result)
            }else{
                let error= new NotFoundError("About not found!");
                res.status(error.statusCode).json(error.payload);
            }
        })
        .catch((error:Error)=>{
            res.status(error.statusCode).json(error.payload);
        })
    }

    static update(req:Request,res:Response){
        const Schema=new evalidate.schema({
            id:evalidate.number().required(),
        })

        const data=req.body;
        const result=Schema.validate(data);
        if(result.isValid){
            AboutService.update(data.id,data)
            .then(()=>res.status(200).json(true))
            .catch((error)=>{
                res.status(error.statusCode).json(error.payload);
            })
        }else{
            let error= new BadRequestError(result.errors);
            res.status(error.statusCode).json(error.payload);
        }

    }

    static delete(req:Request,res:Response){
        let id=req.params.id;
        AboutService.delete(id)
        .then(()=>res.status(200).json(true))
        .catch((error)=>{
            res.status(error.statusCode).json(error.payload);
        })       
    }
}

export default AboutController;