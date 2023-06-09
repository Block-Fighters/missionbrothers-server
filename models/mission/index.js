const Sequelize = require("sequelize");

module.exports = class Mission extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        missionTitle: {
          type: Sequelize.STRING(16),
          allowNull: false,
        },
        rule: {
          type: Sequelize.STRING(16),
          allowNull: false,
        },
        recruitmentEnd: {
          type: Sequelize.STRING(16),
          allowNull: false,
        },
        missionStart: {
          type: Sequelize.STRING(16),
          allowNull: false,
        },
        missionEnd: {
          type: Sequelize.STRING(16),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(3000),
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
          type: Sequelize.STRING(42),
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
    db.Mission.hasMany(db.Certification);
  }
};
