import { Request,Response } from "express";
import evalidate from 'evalidate'
import ProfileService from "../services/Profile.service";
import { BadRequestError, Error, NotFoundError } from "../errors/Error";
import { Profile } from "../models/Profile";


class ProfileController{

    static create(req:Request,res:Response) {
        const Schema=new evalidate.schema({
            title:evalidate.string().required(),
            phone_number:evalidate.string(),
            price_per_houre:evalidate.number().required(),
            address:evalidate.string(),
            region:evalidate.number(),
            city:evalidate.number(),
            img:evalidate.string(),
            user_id:evalidate.number().required(),
        })

        const payload=req.body;
        const result=Schema.validate(payload);

        if(result.isValid){
            ProfileService.create(payload)
            .then((result)=>res.status(201).json(true))
            .catch((error)=>res.status(error.statusCode).json(error.payload));  
        }else{
            let error= new BadRequestError(result.errors)
            res.status(error.statusCode).json(error.payload);
        }

    }

    static findAll(req:Request,res:Response){
        ProfileService.findAll({})
        .then((result:Profile[]|[])=>res.status(200).json(result))
        .catch((error:Error)=>res.status(error.statusCode).json(error.payload));
    }

    static findById(req:Request,res:Response){
        const id=req.params.id;
        ProfileService.findById(id)
        .then((result:Profile|{})=>{
            if(result){
                res.status(200).json(result)
            }else{
                let error= new NotFoundError("Profile not found!");
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
            ProfileService.update(data.id,data)
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
        ProfileService.delete(id)
        .then(()=>res.status(200).json(true))
        .catch((error)=>{
            res.status(error.statusCode).json(error.payload);
        })
        
    }

}

export default ProfileController;