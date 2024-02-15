const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Patient', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    section_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Sections',
        key: 'section_id'
      }
    },
    Fname: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Lname: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    DOB: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Religion: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Height: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    Weight: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    primary_diagnosis: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pert_history: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    prev_medHistory: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    social_History: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Temperature: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    heart_rate: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    BPS: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    BPD: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    blood_oxygen: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    resting_respiratory: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pain: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Patient',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "patient_fk1_idx",
        using: "BTREE",
        fields: [
          { name: "section_id" },
        ]
      },
    ]
  });
};
