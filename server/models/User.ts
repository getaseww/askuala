import { Sequelize, Model, DataTypes } from "sequelize";


export class User extends Model {
    public id!: number;
    public first_name!: string;
    public last_name!: string;
    public email!:string;
    public password!:string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default(sequelize:Sequelize)=>{
    User.init({
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        first_name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        last_name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    },{
        sequelize,
        modelName:"user",
        tableName:"users"
    })
};