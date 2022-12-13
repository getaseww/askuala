import { Transaction } from "sequelize";
import { Review } from "../models/Review";

class ReviewDAL{
    static create(data:any,transaction:Transaction):Promise<Review>{

        return new Promise((resolve,reject)=>{
           Review.create(data,{transaction})
           .then((result)=>resolve(result))
           .catch((error)=>reject(error)); 
        });
    }


    static findMany(query:any){
        return new Promise((resolve,reject)=>{
            Review.findAll({
                where:query
            }).then((result)=>resolve(result))
            .catch((error)=>reject(error));
        })
    }

    static findOne(query:any){
        return new Promise((resolve,reject)=>{
            Review.findOne({
                where:query
            }).then((result)=>resolve(result))
            .catch((error)=>reject(error));
        })
    }


    static findById(query:any){
        return new Promise((resolve,reject)=>{
            Review.findOne({
                where:query
            }).then((result)=>resolve(result))
            .catch((error)=>reject(error));
        })
    }

    static update(review:Review,data:Review,transaction?:Transaction){
        return new Promise((resolve,reject)=>{
            if(review){

            if(data.rate) review.rate=data.rate;
            if(data.review) review.review=data.review;
    

            review.save({transaction})
            .then((result)=>resolve(result))
            .catch((error)=>reject(error));
            }else{
                resolve(null);
            }
        })
    }

    static delete(query:any){
        return new Promise((resolve,reject)=>{
            Review.destroy({
                where:query
            })
            .then((result)=>resolve(result))
            .catch((error)=>reject(error));
        })
    }
}


export default ReviewDAL;