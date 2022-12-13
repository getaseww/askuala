import config from "config";
import { Sequelize, Transaction } from "sequelize";
import AboutFactory,{About} from "../../models/About";
import EducationFactory,{Education} from "../../models/Education";
import PaymentFactory,{Payment} from "../../models/Payment";
import ProfileFactory,{Profile} from "../../models/Profile";
import ReviewFactory,{Review} from "../../models/Review";
import UserFactory,{User} from "../../models/User";
import logger from "../loggers/winston";
// import SingleDataItemFactory, {
//   SingleDataItem,
// } from "../../models/SingleDataItem";


export let sequelize: Sequelize;

export default async () => {
  let dbHost: string = config.get("database.host");
  let dbPort: string = config.get("database.port");
  let dbName: string = config.get("database.name");
  let dbUser: string = config.get("database.user");
  let dbPassword: string =
    process.env.DB_PASSWORD || config.get("database.password");

  sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: "mysql",
    dialectOptions: { decimalNumbers: true },
    logging: true,
  });

  UserFactory(sequelize);
  ProfileFactory(sequelize);
  AboutFactory(sequelize);
  EducationFactory(sequelize);
  PaymentFactory(sequelize);
  ReviewFactory(sequelize);

  User.hasMany(Education,{foreignKey:"user_id"});
  Education.belongsTo(User,{foreignKey:"user_id"});

  User.hasOne(Profile,{foreignKey:"user_id"});
  Profile.belongsTo(User,{foreignKey:"user_id"});

  User.hasOne(About,{foreignKey:"user_id"});
  About.belongsTo(User,{foreignKey:"user_id"});

  User.hasMany(Review,{foreignKey:"user_id"});
  Review.belongsTo(User,{foreignKey:"user_id"});

  User.hasMany(Payment,{foreignKey:"user_id"});
  Payment.belongsTo(User,{foreignKey:"user_id"});
  
  sequelize
    .sync({ force: false })
    .then(() => {
      logger.info("Connection has been established successfully.");
    })
    .catch((error: any) => {
      console.log(error);
      logger.error(`Database connection error: ${error}`);
    });
};

export const createTransaction = (): Promise<Transaction> => {
  return new Promise(async (resolve, reject) => {
    sequelize
      .transaction()
      .then((transaction) => resolve(transaction))
      .catch((error) => reject(error));
  });
};

export {
  User,
  Profile,
  About,
  Payment,
  Review,
  Education,
};
