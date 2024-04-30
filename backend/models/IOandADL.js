const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('IOandADL', {
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Patient',
        key: 'id'
      }
    },
    IOandADL_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true // This is the line to add if you want auto-increment
    }
    ,
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true
    },
    intake: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    output: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    intake_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    output_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    oral: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    bathing: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    foley_care: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    reposition: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    elimination: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    meal: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    meal_consumed: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'IOandADL',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "patient_id" },
          { name: "time" },
          { name: "IOandADL_id" },
        ]
      },
    ]
  });
};
