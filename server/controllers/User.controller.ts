import {Request,Response} from 'express'
import evalidate from 'evalidate'
import UserService from '../services/User.service';
import { BadRequestError, Error, NotFoundError } from '../errors/Error';
import { User } from '../models/User';


class UserController{
    static create(req:Request,res:Response) {
        const Schema=new evalidate.schema({
            first_name:evalidate.string().required(),
            last_name:evalidate.string().required(),
            email:evalidate.string().required().email(),
            password:evalidate.string().required().minlength(8),
        })

        const payload=req.body;
        const result=Schema.validate(payload);

        if(result.isValid){
            UserService.create(payload)
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
        UserService.findAll({})
        .then((result:User[]|[])=>res.status(200).json(result))
        .catch((error:Error)=>res.status(error.statusCode).json(error.payload));
    }

    static findById(req:Request,res:Response){
        const id=req.params.id;
        UserService.findById(id)
        .then((result:User|{})=>{
            if(result){
                res.status(200).json(result)
            }else{
                let error= new NotFoundError("User not found!");
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
            UserService.update(data.id,data)
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

        UserService.delete(id)
        .then(()=>res.status(200).json(true))
        .catch((error)=>{
            res.status(error.statusCode).json(error.payload);
        })
    }
}

export default UserController;