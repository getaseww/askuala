import { Transaction } from "sequelize";
import { Education } from "../models/Education";


class EducationDAL {
    static create(data: any, transaction: Transaction): Promise<Education> {
        return new Promise((resolve, reject) => {
            Education.create(data, { transaction })
                .then((result) => resolve(result))
                .catch((error) => reject(error));
        });
    }


    static findMany(query: any) {
        return new Promise((resolve, reject) => {
            Education.findAll({
                where: query
            }).then((result) => resolve(result))
                .catch((error) => reject(error));
        })
    }


    static findOne(query: any) {
        return new Promise((resolve, reject) => {
            Education.findOne({
                where: query
            }).then((result) => resolve(result))
                .catch((error) => reject(error));
        })
    }


    static findById(query: any) {
        return new Promise((resolve, reject) => {
            Education.findOne({
                where: query
            }).then((result) => resolve(result))
                .catch((error) => reject(error));
        })
    }

    static update(education: Education, data: Education, transaction: Transaction) {
        return new Promise((resolve, reject) => {
            if (education) {
                if (data.start_date) education.start_date = data.start_date;
                if (data.end_date) education.end_date = data.end_date;
                if (data.school) education.school = data.school;
                if (data.field) education.field = data.field;
                if (data.grade) education.grade = data.grade;
                if (data.desc) education.desc = data.desc;


                education.save({ transaction })
                    .then((result) => resolve(result))
                    .catch((error) => reject(error));
            } else {
                resolve(null);
            }
        })
    }

    static delete(query: any) {
        return new Promise((resolve, reject) => {
            Education.destroy({
                where: query
            })
                .then((result) => resolve(result))
                .catch((error) => reject(error));
        })
    }
}


export default EducationDAL;