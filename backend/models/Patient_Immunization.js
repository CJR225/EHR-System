const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Patient_Immunization', {
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Patient',
        key: 'id'
      }
    },
    immunzation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Immunizations',
        key: 'immunization_id'
      }
    },
    timedate: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'Patient_Immunization',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "patient_id" },
          { name: "immunzation_id" },
          { name: "timedate" },
        ]
      },
      {
        name: "PI_fk2_idx",
        using: "BTREE",
        fields: [
          { name: "immunzation_id" },
        ]
      },
    ]
  });
};
