import { Request,Response } from "express";
import evalidate from 'evalidate'


class ProfileController{

    static create(request:Request,response:Response) {
        const Schema=new evalidate.schema({
            title:evalidate.string().required(),
            phone_number:evalidate.string(),
            price_per_houre:evalidate.number().required(),
            address:evalidate.string(),
            region:evalidate.number(),
            city:evalidate.number(),
            img:evalidate.string(),
        })

        const payload=request.body;
        const result=Schema.validate(payload);

        if(result.isValid){
            
        }

    }
}

export default ProfileController;