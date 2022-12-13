import { HostNotFoundError, Transaction } from "sequelize";
import { Profile } from "../models/Profile";
import async, { reject } from 'async'
import { createTransaction } from "../utilities/database/sequelize";
import { BadRequestError, InternalServerError, NotFoundError } from "../errors/Error";
import ProfileDAL from "../dals/Profile.dal";


class ProfileService {

    static create(profile: any, transaction?: Transaction): Promise<any> {
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
                    ProfileDAL.create(profile, transaction)
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

    
    static findAll(query:any):Promise<Profile[]>{
        return new Promise((resolve,reject)=>{
            ProfileDAL.findMany(query)
            .then((user:any)=>{resolve(user)})
            .catch((error)=>{
                reject(new InternalServerError(error));
            })     
        })
    }

    static findOne(query:any):Promise<Profile>{
        return new Promise((resolve,reject)=>{
            ProfileDAL.findOne(query)
            .then((result:any)=>{
                resolve(result)
            })
            .catch((error)=>{
                reject(new InternalServerError(error))
            })
        })
    }

    static findById(query:any):Promise<Profile>{
        return new Promise((resolve,reject)=>{
            ProfileDAL.findById(query)
            .then((result:any)=>{
                resolve(result);
            })
            .catch((error)=>{
                reject(new InternalServerError(error));
            })
        })
    }


    static update(id:number,payload:Profile,transaction?:Transaction){
        return new Promise((resolve,reject)=>{
            async.waterfall([
                (done:Function)=>{
                    ProfileDAL.findOne({id:id})
                    .then((result)=>{
                        if(result){
                            done(null,result);
                        }else{
                            done(new NotFoundError("Profile not found"));
                        }
                    })
                    .catch((error)=>done(new InternalServerError(error)))
                },
                (profile:Profile,done:Function)=>{
                    ProfileDAL.update(profile,payload,transaction)
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


    static delete(id:string):Promise<Profile>{
        return new Promise((resolve,reject)=>{
            ProfileDAL.delete({id:id})
            .then((result:any)=>resolve(result))
            .catch((error)=>{
                reject(new InternalServerError(error));
            })
        })
    }
}

export default ProfileService;