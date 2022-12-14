import { Request,Response } from "express";
import evalidate from 'evalidate'
import EducationService from "../services/Education.service";
import { BadRequestError, Error, NotFoundError } from "../errors/Error";
import { Education } from "../models/Education";


class EducationController{

    static create(req:Request,res:Response) {
        const Schema=new evalidate.schema({
            start_date:evalidate.date().required(),
            end_date:evalidate.date().required(),
            school:evalidate.string().required(),
            field:evalidate.string().required(),
            grade:evalidate.number(),
            desc:evalidate.string(),
            user_id:evalidate.number().required(),
        })

        const payload=req.body;
        const result=Schema.validate(payload);

        if(result.isValid){
            EducationService.create(payload)
            .then((result)=>res.status(201).json(true))
            .catch((error)=>res.status(error.statusCode).json(error.payload));  
        }else{
            let error= new BadRequestError(result.errors)
            res.status(error.statusCode).json(error.payload);
        }

    }

    static findAll(req:Request,res:Response){
        EducationService.findAll({})
        .then((result:Education[]|[])=>res.status(200).json(result))
        .catch((error:Error)=>res.status(error.statusCode).json(error.payload));
    }

    static findById(req:Request,res:Response){
        const id=req.params.id;
        EducationService.findById(id)
        .then((result:Education|{})=>{
            if(result){
                res.status(200).json(result)
            }else{
                let error= new NotFoundError("Education not found!");
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
            EducationService.update(data.id,data)
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
        EducationService.delete(id)
        .then(()=>res.status(200).json(true))
        .catch((error)=>{
            res.status(error.statusCode).json(error.payload);
        })       
    }
}

export default EducationController;