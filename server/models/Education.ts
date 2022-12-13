import { DataTypes, Model, Sequelize } from "sequelize";

export class Education extends Model{
    public id!:number;
    public start_date!:Date;
    public end_date!:Date;
    public school!:string;
    public field!:string;
    public grade!:number;
    public desc!:string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


export default(sequelize:Sequelize)=>{
    Education.init({
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        start_date:{
            type:DataTypes.DATE,
            allowNull:false,
        },
        end_date:{
            type:DataTypes.DATE,
            allowNull:false,
        },
        school:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        field:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        grade:{
            type:DataTypes.DOUBLE,
        },
        desc:{
            type:DataTypes.TEXT,
        }
    },{
        sequelize,
        modelName:"education",
        tableName:"educations",
    })
}