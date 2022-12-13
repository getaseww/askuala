import { Sequelize, Model, DataTypes } from "sequelize";


export class Profile extends Model {
    public id!: number;
    public title!: string;
    public phone_number!: string;
    public price!: number;
    public address!: string;
    public region!: number;
    public city!: number;
    public img!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


export default (sequelize: Sequelize) => {
    Profile.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING,
        },
        price_per_houre: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
        },
        region: {
            type: DataTypes.INTEGER,
        },
        city: {
            type: DataTypes.INTEGER,
        },
        img: {
            type: DataTypes.STRING,
        }
    }, {
        sequelize,
        modelName: "profile",
        tableName: "profiles",
    })
}