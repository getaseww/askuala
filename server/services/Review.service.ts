import { HostNotFoundError, Transaction } from "sequelize";
import { Review } from "../models/Review";
import async, { reject } from 'async'
import { createTransaction } from "../utilities/database/sequelize";
import { BadRequestError, InternalServerError, NotFoundError } from "../errors/Error";
import ReviewDAL from "../dals/Review.dal";


class ReviewService {

    static create(review: any, transaction?: Transaction): Promise<any> {
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
                    ReviewDAL.create(review, transaction)
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

    
    static findAll(query:any):Promise<Review[]>{
        return new Promise((resolve,reject)=>{
            ReviewDAL.findMany(query)
            .then((user:any)=>{resolve(user)})
            .catch((error)=>{
                reject(new InternalServerError(error));
            })     
        })
    }

    static findOne(query:any):Promise<Review>{
        return new Promise((resolve,reject)=>{
            ReviewDAL.findOne(query)
            .then((result:any)=>{
                resolve(result)
            })
            .catch((error)=>{
                reject(new InternalServerError(error))
            })
        })
    }

    static findById(query:any):Promise<Review>{
        return new Promise((resolve,reject)=>{
            ReviewDAL.findById(query)
            .then((user:any)=>{
                resolve(user);
            })
            .catch((error)=>{
                reject(new InternalServerError(error));
            })
        })
    }


    static update(id:number,payload:Review,transaction?:Transaction){
        return new Promise((resolve,reject)=>{
            async.waterfall([
                (done:Function)=>{
                    ReviewDAL.findOne({id:id})
                    .then((result)=>{
                        if(result){
                            done(null,result);
                        }else{
                            done(new NotFoundError("Review not found"));
                        }
                    })
                    .catch((error)=>done(new InternalServerError(error)))
                },
                (review:Review,done:Function)=>{
                    ReviewDAL.update(review,payload,transaction)
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


    static delete(id:string):Promise<Review>{
        return new Promise((resolve,reject)=>{
            ReviewDAL.delete({id:id})
            .then((result:any)=>resolve(result))
            .catch((error)=>{
                reject(new InternalServerError(error));
            })
        })
    }
}

export default ReviewService;