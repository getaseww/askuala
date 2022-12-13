import { DataTypes, Model, Sequelize } from "sequelize";

export class Token extends Model {
    public id!: number;
    public token!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


export default (sequelize: Sequelize) => {
    Token.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "token",
        tableName: "tokens",
    })
}