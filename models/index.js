const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

const User = require("./user");
const Mission = require("./mission");

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = User;
db.Mission = Mission;

User.init(sequelize);
Mission.init(sequelize);

User.associate(db);
Mission.associate(db);

module.exports = db;
