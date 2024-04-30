module.exports = function(sequelize, DataTypes) {
  const MedRec = sequelize.define('MedRec', {
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Patients', // Make sure this references the table name correctly
        key: 'id'
      }
    },
    medicationName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dose: {
      type: DataTypes.STRING,
      allowNull: false
    },
    route: {
      type: DataTypes.STRING,
      allowNull: false
    },
    frequency: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastTaken: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'MedRec', // Make sure this is the correct table name
    timestamps: false  // This tells Sequelize not to use the default timestamp fields
  });

  return MedRec;
};
