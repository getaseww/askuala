import {Request,Response} from 'express'

import evalidate from 'evalidate';
import ReviewService from '../services/Review.service';
import { BadRequestError, Error, NotFoundError } from '../errors/Error';
import { Review } from '../models/Review';


class ReviewController{
    static create(req:Request,res:Response) {
        const Schema=new evalidate.schema({
            rate:evalidate.number().required(),
            content:evalidate.string(),
            user_id:evalidate.number().required(),
        })

        const payload=req.body;
        const result=Schema.validate(payload);

        if(result.isValid){
            ReviewService.create(payload)
            .then(()=>res.status(201).json(true))
            .catch((error)=>{
                res.status(error.statusCode).json(error.payload);
            })
        }else{
            let error=new BadRequestError(result.errors);
            res.status(error.statusCode).json(error.payload);
        }

    }


    static findAll(req:Request,res:Response){
        ReviewService.findAll({})
        .then((result:Review[]|[])=>res.status(200).json(result))
        .catch((error:Error)=>res.status(error.statusCode).json(error.payload));
    }

    static findById(req:Request,res:Response){
        const id=req.params.id;
        ReviewService.findById(id)
        .then((result:Review|{})=>{
            if(result){
                res.status(200).json(result)
            }else{
                let error= new NotFoundError("Review not found!");
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
            ReviewService.update(data.id,data)
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
        ReviewService.delete(id)
        .then(()=>res.status(200).json(true))
        .catch((error)=>{
            res.status(error.statusCode).json(error.payload);
        })
    }
}

export default ReviewController;
