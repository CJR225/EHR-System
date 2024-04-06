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
    emergency_contact_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    emergency_contact_number: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    insurance: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    gender_at_birth: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    fname: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    lname: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    religion: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    height: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    weight: {
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
    prev_medhistory: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    social_history: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    temperature: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    heart_rate: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bps: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    bpd: {
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
