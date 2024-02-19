const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('medicine_patient', {
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Patient',
        key: 'id'
      }
    },
    med_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Medicine',
        key: 'id'
      }
    },
    dosage: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    route: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    frequency: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    taken_last: {
      type: DataTypes.DATE,
      allowNull: true
    },
    time_taken: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'medicine_patient',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "med_id" },
          { name: "patient_id" },
        ]
      },
      {
        name: "fk_medpat_idx",
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      },
    ]
  });
};
