import { HostNotFoundError, Transaction } from "sequelize";
import { About } from "../models/About";
import async, { reject } from 'async'
import { createTransaction } from "../utilities/database/sequelize";
import { BadRequestError, InternalServerError, NotFoundError } from "../errors/Error";
import AboutDAL from "../dals/About.dal";


class AboutService {

    static create(about: any, transaction?: Transaction): Promise<any> {
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
                    AboutDAL.create(about, transaction)
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

    
    static findAll(query:any):Promise<About[]>{
        return new Promise((resolve,reject)=>{
            AboutDAL.findMany(query)
            .then((result:any)=>{resolve(result)})
            .catch((error)=>{
                reject(new InternalServerError(error));
            })     
        })
    }

    static findOne(query:any):Promise<About>{
        return new Promise((resolve,reject)=>{
            AboutDAL.findOne(query)
            .then((result:any)=>{
                resolve(result)
            })
            .catch((error)=>{
                reject(new InternalServerError(error))
            })
        })
    }

    static findById(query:any):Promise<About>{
        return new Promise((resolve,reject)=>{
            AboutDAL.findById(query)
            .then((result:any)=>{
                resolve(result);
            })
            .catch((error)=>{
                reject(new InternalServerError(error));
            })
        })
    }


    static update(id:number,payload:About,transaction?:Transaction){
        return new Promise((resolve,reject)=>{
            async.waterfall([
                (done:Function)=>{
                    AboutDAL.findOne({id:id})
                    .then((result)=>{
                        if(result){
                            done(null,result);
                        }else{
                            done(new NotFoundError("About Information not found"));
                        }
                    })
                    .catch((error)=>done(new InternalServerError(error)))
                },
                (about:About,done:Function)=>{
                    AboutDAL.update(about,payload,transaction)
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


    static delete(id:string):Promise<About>{
        return new Promise((resolve,reject)=>{
            AboutDAL.delete({id:id})
            .then((result:any)=>resolve(result))
            .catch((error)=>{
                reject(new InternalServerError(error));
            })
        })
    }
}

export default AboutService;