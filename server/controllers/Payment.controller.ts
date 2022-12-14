import { Request,Response } from "express";
import evalidate from 'evalidate'
import PaymentService from "../services/Payment.service";
import { BadRequestError, Error, NotFoundError } from "../errors/Error";
import { Payment } from "../models/Payment";


class PaymentController{

    static create(req:Request,res:Response) {
        const Schema=new evalidate.schema({
            first_name:evalidate.string().required(),
            last_name:evalidate.string().required(),
            amount:evalidate.number().required(),
            email:evalidate.string().required().email(),
            user_id:evalidate.number().required(),
        })

        const payload=req.body;
        const result=Schema.validate(payload);

        if(result.isValid){
            PaymentService.create(payload)
            .then((result)=>res.status(201).json(true))
            .catch((error)=>res.status(error.statusCode).json(error.payload));  
        }else{
            let error= new BadRequestError(result.errors)
            res.status(error.statusCode).json(error.payload);
        }

    }

    static findAll(req:Request,res:Response){
        PaymentService.findAll({})
        .then((result:Payment[]|[])=>res.status(200).json(result))
        .catch((error:Error)=>res.status(error.statusCode).json(error.payload));
    }

    static findById(req:Request,res:Response){
        const id=req.params.id;
        PaymentService.findById(id)
        .then((result:Payment|{})=>{
            if(result){
                res.status(200).json(result)
            }else{
                let error= new NotFoundError("Payment not found!");
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
            PaymentService.update(data.id,data)
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
        PaymentService.delete(id)
        .then(()=>res.status(200).json(true))
        .catch((error)=>{
            res.status(error.statusCode).json(error.payload);
        })
        
    }

}

export default PaymentController;