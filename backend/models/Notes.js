const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  const Notes = sequelize.define('Notes', {
    note_id: {
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
    timestamps: true, // Enable timestamps
    updatedAt: false, // Disable the updatedAt timestamp
    createdAt: 'created_at', // Rename createdAt to created_at if you prefer
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
