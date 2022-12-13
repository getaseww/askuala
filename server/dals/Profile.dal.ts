import { Transaction } from "sequelize";
import { Profile } from "../models/Profile";


class ProfileDAL{
    static create(data:any,transaction:Transaction):Promise<Profile>{
        return new Promise((resolve,reject)=>{
            Profile.create(data,{transaction})
           .then((result)=>resolve(result))
           .catch((error)=>reject(error)); 
        });
    }


    static findMany(query:any){
        return new Promise((resolve,reject)=>{
            Profile.findAll({
                where:query
            }).then((result)=>resolve(result))
            .catch((error)=>reject(error));
        })
    }

    
    static findOne(query:any){
        return new Promise((resolve,reject)=>{
            Profile.findOne({
                where:query
            }).then((result)=>resolve(result))
            .catch((error)=>reject(error));
        })
    }


    static findById(query:any){
        return new Promise((resolve,reject)=>{
            Profile.findOne({
                where:query
            }).then((result)=>resolve(result))
            .catch((error)=>reject(error));
        })
    }

    static update(profile:Profile,data:Profile,transaction?:Transaction){
        return new Promise((resolve,reject)=>{
            if(profile){
            if(data.title) profile.title=data.title;
            if(data.phone_number) profile.phone_number=data.phone_number;
            if(data.price)  profile.price=data.price;
            if(data.address) profile.address=data.address;
            if(data.region) profile.region=data.region;
            if(data.city) profile.city=data.city;
            if(data.img) profile.img=data.img;



            profile.save({transaction})
            .then((result)=>resolve(result))
            .catch((error)=>reject(error));
            }else{
                resolve(null);
            }
        })
    }

    static delete(query:any){
        return new Promise((resolve,reject)=>{
            Profile.destroy({
                where:query
            })
            .then((result)=>resolve(result))
            .catch((error)=>reject(error));
        })
    }
}


export default ProfileDAL;