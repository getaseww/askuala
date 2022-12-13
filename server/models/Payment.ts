import { DataTypes, Model, Sequelize } from "sequelize";

export class Payment extends Model{
    public id!:number;
    public first_name!:string;
    public last_name!:string;
    public amount!:string;
    public tx_ref!:string;
    public email!:string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


export default(sequelize:Sequelize)=>{
    Payment.init({
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
        amount:{
            type:DataTypes.DOUBLE,
            allowNull:false,
        },
        tx_ref:{
            type:DataTypes.STRING,
            allowNull:false,
        },
    },{
        sequelize,
        modelName:"payment",
        tableName:"payments",
    })
}