const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PlanofCare', {
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Patient',
        key: 'id'
      }
    },
    plan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    diagnosis: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    assessment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    patient_goals: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    evaluation: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    interventions: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'PlanofCare',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "plan_id" },
          { name: "patient_id" },
        ]
      },
      {
        name: "fk_plan",
        using: "BTREE",
        fields: [
          { name: "patient_id" },
        ]
      },
    ]
  });
};
