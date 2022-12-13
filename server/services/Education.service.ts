import { HostNotFoundError, Transaction } from "sequelize";
import { Education } from "../models/Education";
import async, { reject } from 'async'
import { createTransaction } from "../utilities/database/sequelize";
import { BadRequestError, InternalServerError, NotFoundError } from "../errors/Error";
import EducationDAL from "../dals/Education.dal";


class EducationService {

    static create(education: any, transaction?: Transaction): Promise<any> {
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
                    EducationDAL.create(education, transaction)
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

    
    static findAll(query:any):Promise<Education[]>{
        return new Promise((resolve,reject)=>{
            EducationDAL.findMany(query)
            .then((result:any)=>{resolve(result)})
            .catch((error)=>{
                reject(new InternalServerError(error));
            })     
        })
    }

    static findOne(query:any):Promise<Education>{
        return new Promise((resolve,reject)=>{
            EducationDAL.findOne(query)
            .then((result:any)=>{
                resolve(result)
            })
            .catch((error)=>{
                reject(new InternalServerError(error))
            })
        })
    }

    static findById(query:any):Promise<Education>{
        return new Promise((resolve,reject)=>{
            EducationDAL.findById(query)
            .then((result:any)=>{
                resolve(result);
            })
            .catch((error)=>{
                reject(new InternalServerError(error));
            })
        })
    }


    static update(id:number,payload:Education,transaction?:Transaction){
        return new Promise((resolve,reject)=>{
            async.waterfall([
                (done:Function)=>{
                    EducationDAL.findOne({id:id})
                    .then((result)=>{
                        if(result){
                            done(null,result);
                        }else{
                            done(new NotFoundError("Education Information not found"));
                        }
                    })
                    .catch((error)=>done(new InternalServerError(error)))
                },
                (education:Education,done:Function)=>{
                    EducationDAL.update(education,payload,transaction)
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


    static delete(id:string):Promise<Education>{
        return new Promise((resolve,reject)=>{
            EducationDAL.delete({id:id})
            .then((result:any)=>resolve(result))
            .catch((error)=>{
                reject(new InternalServerError(error));
            })
        })
    }
}

export default EducationService;