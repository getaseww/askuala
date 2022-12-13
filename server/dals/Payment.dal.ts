import { Transaction } from "sequelize";
import { Payment } from "../models/Payment";


class PaymentDAL{
    static create(data:any,transaction:Transaction):Promise<Payment>{
        return new Promise((resolve,reject)=>{
            Payment.create(data,{transaction})
           .then((result)=>resolve(result))
           .catch((error)=>reject(error)); 
        });
    }


    static findMany(query:any){
        return new Promise((resolve,reject)=>{
            Payment.findAll({
                where:query
            }).then((result)=>resolve(result))
            .catch((error)=>reject(error));
        })
    }

    
    static findOne(query:any){
        return new Promise((resolve,reject)=>{
            Payment.findOne({
                where:query
            }).then((result)=>resolve(result))
            .catch((error)=>reject(error));
        })
    }


    static findById(query:any){
        return new Promise((resolve,reject)=>{
            Payment.findOne({
                where:query
            }).then((result)=>resolve(result))
            .catch((error)=>reject(error));
        })
    }

    static update(payment:Payment,data:Payment,transaction:Transaction){
        return new Promise((resolve,reject)=>{
            if(payment){
            if(data.first_name) payment.first_name=data.first_name;
            if(data.last_name) payment.last_name=data.last_name;
            if(data.amount)  payment.amount=data.amount;
            if(data.email) payment.email=data.email;


            payment.save({transaction})
            .then((result)=>resolve(result))
            .catch((error)=>reject(error));
            }else{
                resolve(null);
            }
        })
    }

    static delete(query:any){
        return new Promise((resolve,reject)=>{
            Payment.destroy({
                where:query
            })
            .then((result)=>resolve(result))
            .catch((error)=>reject(error));
        })
    }
}


export default PaymentDAL;