const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('medicine_patient', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Patient',
        key: 'id'
      }
    },
    med_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    },
    administered_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'medicine_patient',
    timestamps: false
  });
};
