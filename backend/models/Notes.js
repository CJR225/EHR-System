const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Notes', {
    note_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    ]
  });
};
