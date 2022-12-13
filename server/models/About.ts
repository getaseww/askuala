import { DataTypes, Model, Sequelize } from "sequelize";

export class About extends Model{
    public id!:number;
    public content!:string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default(sequelize:Sequelize)=>{
    About.init({
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        content:{
            type:DataTypes.TEXT,
        }
    },{
        sequelize,
        modelName:"about",
        tableName:"abouts",
    })
}