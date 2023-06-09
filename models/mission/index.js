const Sequelize = require("sequelize");

module.exports = class Mission extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        missionTitle: {
          type: Sequelize.STRING(16),
          allowNull: false,
          unique: true,
        },
        rule: {
          type: Sequelize.STRING(16),
          allowNull: false,
        },
        recruitmentPeriod: {
          type: Sequelize.STRING(16),
          allowNull: false,
        },
        missionPeriod: {
          type: Sequelize.STRING(16),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
        category: {
          type: Sequelize.STRING(16),
          allowNull: false,
        },
        registrant: {
          type: Sequelize.STRING(16),
          allowNull: false,
        },
        img: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        contractAddress: {
          type: Sequelize.STRING(16),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Mission",
        tableName: "missions",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Mission.belongsTo(db.User);
  }
};
