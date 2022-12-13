import { DataTypes, Model, Sequelize } from "sequelize";

export class Review extends Model{
    public id!:number;
    public rate!:number;
    public review!:string;
    public ip!:string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


export default(sequelize:Sequelize)=>{
    Review.init({
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        rate:{
            type:DataTypes.DOUBLE,
            allowNull:false,
        },
        review:{
            type:DataTypes.STRING,
        },
        ip:{
            type:DataTypes.STRING,
            allowNull:false,
        },
    },{
        sequelize,
        modelName:"review",
        tableName:"reviews",
    })
}