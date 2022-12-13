import { HostNotFoundError, Transaction } from "sequelize";
import { User } from "../models/User";
import async, { reject } from 'async'
import { createTransaction } from "../utilities/database/sequelize";
import { BadRequestError, InternalServerError, NotFoundError } from "../errors/Error";
import UserDAL from "../dals/User.dal";


class UserService {

    /**
     * 
     * @param user 
     * @param transaction 
     * @returns 
     */
    static create(user: any, transaction?: Transaction): Promise<any> {
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
                    UserDAL.create(user, transaction)
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

    
    static findAll(query:any):Promise<User[]>{
        return new Promise((resolve,reject)=>{
            UserDAL.findMany(query)
            .then((user:any)=>{resolve(user)})
            .catch((error)=>{
                reject(new InternalServerError(error));
            })     
        })
    }

    static findOne(query:any):Promise<User>{
        return new Promise((resolve,reject)=>{
            UserDAL.findOne(query)
            .then((result:any)=>{
                resolve(result)
            })
            .catch((error)=>{
                reject(new InternalServerError(error))
            })
        })
    }

    static findById(query:any):Promise<User>{
        return new Promise((resolve,reject)=>{
            UserDAL.findById(query)
            .then((user:any)=>{
                resolve(user);
            })
            .catch((error)=>{
                reject(new InternalServerError(error));
            })
        })
    }


    static update(id:number,payload:User,transaction?:Transaction){
        return new Promise((resolve,reject)=>{
            async.waterfall([
                (done:Function)=>{
                    UserDAL.findOne({id:id})
                    .then((user)=>{
                        if(user){
                            done(null,user);
                        }else{
                            done(new NotFoundError("User not found"));
                        }
                    })
                    .catch((error)=>done(new InternalServerError(error)))
                },
                (user:User,done:Function)=>{
                    UserDAL.update(user,payload,transaction)
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


    static delete(id:string):Promise<User>{
        return new Promise((resolve,reject)=>{
            UserDAL.delete({id:id})
            .then((result:any)=>resolve(result))
            .catch((error)=>{
                reject(new InternalServerError(error));
            })
        })
    }
}

export default UserService;