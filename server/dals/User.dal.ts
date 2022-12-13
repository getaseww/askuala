import { reject } from "async";
import { resolve } from "path";
import { Transaction } from "sequelize";
import { User } from "../models/User";

class UserDAL {
    static create(user: any, transaction?: Transaction): Promise<User> {
        return new Promise((resolve, reject) => {
            User.create(user, { transaction: transaction })
                .then((result) => resolve(result))
                .catch((error) => { reject(error) });
        });
    }

    static findMany(query: any): Promise<User[]> {
        return new Promise((resolve, reject) => {
            User.findAll({
                where: query,
            })
                .then((result) => resolve(result))
                .catch((error) => {
                    reject(error)
                })
        })
    }

    /**
     * 
     * @param query 
     * @returns 
     */
    static findOne(query: any) {
        return new Promise((resolve, reject) => {
            User.findOne({
                where: query,
                include: [],
            })
                .then((result) => resolve(result))
                .catch((error) => {
                    reject(error)
                })
        })
    }

    static findById(query: any) {
        return new Promise((resolve, reject) => {
            User.findOne({
                where: query,
                include: []
            })
                .then((result) => resolve(result))
                .catch((error) => reject(error))
        })
    }

    static update(user: User, payload: any, transaction?: Transaction) {
        return new Promise((resolve, reject) => {
            if (user) {
                if (payload.first_name) user.first_name = payload.first_name;
                if (payload.last_name) user.last_name = payload.last_name;
                if (payload.email) user.email = payload.email;
                user.save({ transaction })
                    .then((result) => resolve(result))
                    .catch((error) => reject(error));
            } else {
                resolve(null);
            }
        })
    }


    static delete(query: any) {
        return new Promise((resolve, reject) => {
            User.destroy({
                where: query
            })
                .then((result) => resolve(result))
                .catch((error) => reject(error));
        })
    }
}

export default UserDAL;