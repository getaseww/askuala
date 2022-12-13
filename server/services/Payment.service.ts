import { HostNotFoundError, Transaction } from "sequelize";
import { Payment } from "../models/Payment";
import async, { reject } from 'async'
import { createTransaction } from "../utilities/database/sequelize";
import { BadRequestError, InternalServerError, NotFoundError } from "../errors/Error";
import PaymentDAL from "../dals/Payment.dal";


class PaymentService {

    static create(payment: any, transaction?: Transaction): Promise<any> {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    createTransaction()
                        .then((transaction) => done(null, transaction))
                        .catch((error) => {
                            resolve(new InternalServerError(error))
                        })
                },
                (transaction: Transaction, done: Function) => {
                    PaymentDAL.create(payment, transaction)
                        .then(() => done(null, transaction))
                        .catch((error) => {
                            done(new InternalServerError(error));
                        })
                }
            ], (error, transaction: any) => {
                if (error) {
                    reject(error);
                    transaction.rollback();
                } else {
                    transaction.commit();
                    resolve(true);
                }
            })
        });
    }

    
    static findAll(query:any):Promise<Payment[]>{
        return new Promise((resolve,reject)=>{
            PaymentDAL.findMany(query)
            .then((result:any)=>{resolve(result)})
            .catch((error)=>{
                reject(new InternalServerError(error));
            })     
        })
    }

    static findOne(query:any):Promise<Payment>{
        return new Promise((resolve,reject)=>{
            PaymentDAL.findOne(query)
            .then((result:any)=>{
                resolve(result)
            })
            .catch((error)=>{
                reject(new InternalServerError(error))
            })
        })
    }

    static findById(query:any):Promise<Payment>{
        return new Promise((resolve,reject)=>{
            PaymentDAL.findById(query)
            .then((result:any)=>{
                resolve(result);
            })
            .catch((error)=>{
                reject(new InternalServerError(error));
            })
        })
    }


    static update(id:number,payload:Payment,transaction?:Transaction){
        return new Promise((resolve,reject)=>{
            async.waterfall([
                (done:Function)=>{
                    PaymentDAL.findOne({id:id})
                    .then((result)=>{
                        if(result){
                            done(null,result);
                        }else{
                            done(new NotFoundError("Payment Information not found"));
                        }
                    })
                    .catch((error)=>done(new InternalServerError(error)))
                },
                (payment:Payment,done:Function)=>{
                    PaymentDAL.update(payment,payload,transaction)
                    .then((result)=>resolve(result))
                    .catch((error)=>done( new BadRequestError(error)))
                }
            ],
            (error)=>{
                if(error){
                    reject(error);
                }
            }
            )
        })
    }


    static delete(id:string):Promise<Payment>{
        return new Promise((resolve,reject)=>{
            PaymentDAL.delete({id:id})
            .then((result:any)=>resolve(result))
            .catch((error)=>{
                reject(new InternalServerError(error));
            })
        })
    }
}

export default PaymentService;