module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LabValues', {
    patient_id: DataTypes.INTEGER,
    lab_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    value: DataTypes.STRING(45),
    timedate: DataTypes.DATE,
    pH: {
      type: DataTypes.FLOAT,
      field: 'ph' // Match the database column exactly
    },
    PaCO2: {
      type: DataTypes.FLOAT,
      field: 'paco2'
    },
    PaO2: {
      type: DataTypes.FLOAT,
      field: 'pao2'
    },
    HCO3: {
      type: DataTypes.FLOAT,
      field: 'hco3'
    },
    CO2: {
      type: DataTypes.FLOAT,
      field: 'co2'
    },
    WBC: {
      type: DataTypes.FLOAT,
      field: 'wbc'
    },
    RBC: {
      type: DataTypes.FLOAT,
      field: 'rbc'
    },
    Hemoglobin: {
      type: DataTypes.FLOAT,
      field: 'hemoglobin'
    },
    Hematocrit: {
      type: DataTypes.FLOAT,
      field: 'hematocrit'
    },
    Platelets: {
      type: DataTypes.FLOAT,
      field: 'platelets'
    },
    Hemoglobin_A1c: {
      type: DataTypes.FLOAT,
      field: 'hemoglobin_a1c'
    },
    Sodium: {
      type: DataTypes.FLOAT,
      field: 'sodium'
    },
    Potassium: {
      type: DataTypes.FLOAT,
      field: 'potassium'
    },
    Chloride: {
      type: DataTypes.FLOAT,
      field: 'chloride'
    },
    Magnesium: {
      type: DataTypes.FLOAT,
      field: 'magnesium'
    },
    Glucose: {
      type: DataTypes.FLOAT,
      field: 'glucose'
    },
    Calcium: {
      type: DataTypes.FLOAT,
      field: 'calcium'
    },
    BUN: {
      type: DataTypes.FLOAT,
      field: 'bun'
    },
    Creatinine: {
      type: DataTypes.FLOAT,
      field: 'creatinine'
    },
    Albumin: {
      type: DataTypes.FLOAT,
      field: 'albumin'
    },
    PreAlbumin: {
      type: DataTypes.FLOAT,
      field: 'prealbumin'
    },
    BNP: {
      type: DataTypes.FLOAT,
      field: 'bnp'
    },
    Digoxin_Level: {
      type: DataTypes.FLOAT,
      field: 'digoxin_level'
    }
  }, {
    sequelize,
    tableName: 'LabValues',
    timestamps: false
  });
};
