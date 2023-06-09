const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        metamask: {
          type: Sequelize.STRING(42),
          allowNull: false,
          unique: true,
        },
        nickname: {
          type: Sequelize.STRING(16),
          allowNull: true,
          defaultValue: "김요원",
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Mission);
    db.User.belongsToMany(db.Certification, { through: "Reports" }); // 신고
  }
};
