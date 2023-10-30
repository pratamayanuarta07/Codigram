import { Sequelize } from "sequelize";
import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _postingan from  "./postingan.js";
import _users from  "./users.js";

const sequelize = new Sequelize(
  process.env.DB_NM,
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
  const postingan = _postingan.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  postingan.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(postingan, { as: "postingans", foreignKey: "user_id"});

  return {
    postingan,
    users,
  };
}

const models = initModels(sequelize);
export default models;
export {sequelize};