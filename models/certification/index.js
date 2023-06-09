const Sequelize = require("sequelize");

module.exports = class Certification extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        img: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Certification",
        tableName: "certifications",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Certification.belongsToMany(db.User, {
      through: "Reports",
      as: "reporters",
    }); // 신고
    db.Certification.belongsTo(db.Mission);
  }
};
