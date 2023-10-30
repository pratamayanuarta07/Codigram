import { Sequelize } from "sequelize";
import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _posting from  "./posting.js";
import _users from  "./users.js";

const sequelize = new Sequelize(
  process.env.DB_NM2,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect:"postgres",
    pool:{
      max:5,
      min:0,
      acquire:30000,
      idle:10000
    }
  }
)

function initModels(sequelize) {
  const posting = _posting.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  posting.belongsTo(users, { as: "user", foreignKey: "userid"});
  users.hasMany(posting, { as: "postings", foreignKey: "userid"});

  return {
    posting,
    users,
  };
}


const models = initModels(sequelize);
export default models;
export {sequelize};
