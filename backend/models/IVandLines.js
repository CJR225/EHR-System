const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('IVandLines', {
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Patient',
        key: 'id'
      }
    },
    iv_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Type: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    size: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    CDI: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    location: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    rate: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    patent: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'IVandLines',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "patient_id" },
          { name: "iv_id" },
        ]
      },
    ]
  });
};
