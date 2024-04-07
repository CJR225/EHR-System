const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PatientHistory', {
    history_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true 
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Patient', 
        key: 'id'
      }
    },
    history_of_presenting_problem: {
      type: DataTypes.TEXT, 
      allowNull: true
    },
    past_medical_history: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    family_history: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'PatientHistory',
    timestamps: true, 
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "history_id" },
        ]
      },
      {
        name: "patient_history_fk_idx",
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      },
    ]
  });
};
