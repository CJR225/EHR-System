const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  const Notes = sequelize.define('Notes', {
    note_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true // If you want Sequelize to auto-increment the primary key
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Patient', // Ensure this matches the table name exactly as it is defined in Sequelize
        key: 'id'         // This should be 'id', matching the primary key in the Patient model
      }
    },
    
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    consult: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Notes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "note_id" },
        ]
      },
      {
        name: "fk_notes_patient_id",
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      }
    ]
  });

  return Notes;
};
