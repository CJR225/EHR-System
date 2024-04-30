const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Orders', {
    patient_id: {
      type: DataTypes.BIGINT, // Updated to BIGINT to match your database schema
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Patient',
        key: 'id'
      }
    },
    order_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    visible_to_students: {
      type: DataTypes.BOOLEAN, // Adding the visibility field
      allowNull: false,
      defaultValue: false // Defaulting visibility to false
    }
  }, {
    sequelize,
    tableName: 'Orders',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "order_id" },
          { name: "patient_id" },
        ]
      },
      {
        name: "fk_orders",
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      },
    ]
  });
};
