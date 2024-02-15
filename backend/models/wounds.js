const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wounds', {
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Patient',
        key: 'id'
      }
    },
    wound_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pressure_sore: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    surgical_wound: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    trauma_wound: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    drain_notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'wounds',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "wound_id" },
          { name: "patient_id" },
        ]
      },
      {
        name: "fk_wounds",
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      },
    ]
  });
};
