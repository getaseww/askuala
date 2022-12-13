import { Transaction } from "sequelize";
import { About } from "../models/About";

class AboutDAL{
    static create(data:any,transaction:Transaction):Promise<About>{

        return new Promise((resolve,reject)=>{
           About.create(data,{transaction})
           .then((result)=>resolve(result))
           .catch((error)=>reject(error)); 
        });
    }


    static findMany(query:any){
        return new Promise((resolve,reject)=>{
            About.findAll({
                where:query
            }).then((result)=>resolve(result))
            .catch((error)=>reject(error));
        })
    }

    static findOne(query:any){
        return new Promise((resolve,reject)=>{
            About.findOne({
                where:query
            }).then((result)=>resolve(result))
            .catch((error)=>reject(error));
        })
    }


    static findById(query:any){
        return new Promise((resolve,reject)=>{
            About.findOne({
                where:query
            }).then((result)=>resolve(result))
            .catch((error)=>reject(error));
        })
    }

    static update(about:About,data:About,transaction:Transaction){
        return new Promise((resolve,reject)=>{
            if(about){

            if(data.content) about.content=data.content;
            about.save({transaction})
            .then((result)=>resolve(result))
            .catch((error)=>reject(error));
            }else{
                resolve(null);
            }
        })
    }

    static delete(query:any){
        return new Promise((resolve,reject)=>{
            About.destroy({
                where:query
            })
            .then((result)=>resolve(result))
            .catch((error)=>reject(error));
        })
    }
}


export default AboutDAL;