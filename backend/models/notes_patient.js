const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notes_patient', {
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Patient',
        key: 'id'
      }
    },
    notes_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Notes',
        key: 'note_id'
      }
    }
  }, {
    sequelize,
    tableName: 'notes_patient',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "patient_id" },
          { name: "notes_id" },
        ]
      },
      {
        name: "NP_fk2_idx",
        using: "BTREE",
        fields: [
          { name: "notes_id" },
        ]
      },
    ]
  });
};
