const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Patient_Allergy', {
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Patient',
        key: 'id'
      }
    },
    allergy_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Allergies',
        key: 'allergy_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Patient_Allergy',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "patient_id" },
          { name: "allergy_id" },
        ]
      },
      {
        name: "AI_fk2_idx",
        using: "BTREE",
        fields: [
          { name: "allergy_id" },
        ]
      },
    ]
  });
};
