var DataTypes = require("sequelize").DataTypes;
var _Allergies = require("./Allergies");
var _IOandADL = require("./IOandADL");
var _IVandLines = require("./IVandLines");
var _Immunizations = require("./Immunizations");
var _Instructor = require("./Instructor");
var _LabValues = require("./LabValues");
var _Medicine = require("./Medicine");
var _Notes = require("./Notes");
var _Orders = require("./Orders");
var _Patient = require("./Patient");
var _Patient_Allergy = require("./Patient_Allergy");
var _Patient_Immunization = require("./Patient_Immunization");
var _PlanofCare = require("./PlanofCare");
var _Sections = require("./Sections");
var _SequelizeMeta = require("./SequelizeMeta");
var _Student = require("./Student");
var _medicine_patient = require("./medicine_patient");
var _notes_patient = require("./notes_patient");
var _wounds = require("./wounds");
var _PatientHistory = require("./PatientHistory");
var _VitalSigns = require("./VitalSigns");


function initModels(sequelize) {


  var Allergies = _Allergies(sequelize, DataTypes);
  var IOandADL = _IOandADL(sequelize, DataTypes);
  var IVandLines = _IVandLines(sequelize, DataTypes);
  var Immunizations = _Immunizations(sequelize, DataTypes);
  var Instructor = _Instructor(sequelize, DataTypes);
  var LabValues = _LabValues(sequelize, DataTypes);
  var Medicine = _Medicine(sequelize, DataTypes);
  var Notes = _Notes(sequelize, DataTypes);
  var Orders = _Orders(sequelize, DataTypes);
  var Patient = _Patient(sequelize, DataTypes);
  var Patient_Allergy = _Patient_Allergy(sequelize, DataTypes);
  var Patient_Immunization = _Patient_Immunization(sequelize, DataTypes);
  var PlanofCare = _PlanofCare(sequelize, DataTypes);
  var Sections = _Sections(sequelize, DataTypes);
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var Student = _Student(sequelize, DataTypes);
  var medicine_patient = _medicine_patient(sequelize, DataTypes);
  var notes_patient = _notes_patient(sequelize, DataTypes);
  var wounds = _wounds(sequelize, DataTypes);
  var PatientHistory = _PatientHistory(sequelize, DataTypes);
  var VitalSigns = _VitalSigns(sequelize, DataTypes);

  

  Allergies.belongsToMany(Patient, { as: 'patient_id_Patients', through: Patient_Allergy, foreignKey: "allergy_id", otherKey: "patient_id" });
  Immunizations.belongsToMany(Patient, { as: 'patient_id_Patient_Patient_Immunizations', through: Patient_Immunization, foreignKey: "immunzation_id", otherKey: "patient_id" });
  Medicine.belongsToMany(Patient, { as: 'patient_id_Patient_medicine_patients', through: medicine_patient, foreignKey: "med_id", otherKey: "patient_id" });
  Notes.belongsToMany(Patient, { as: 'patient_id_Patient_notes_patients', through: notes_patient, foreignKey: "notes_id", otherKey: "patient_id" });
  Patient.belongsToMany(Allergies, { as: 'allergy_id_Allergies', through: Patient_Allergy, foreignKey: "patient_id", otherKey: "allergy_id" });
  Patient.belongsToMany(Immunizations, { as: 'immunzation_id_Immunizations', through: Patient_Immunization, foreignKey: "patient_id", otherKey: "immunzation_id" });
  Patient.belongsToMany(Medicine, { as: 'med_id_Medicines', through: medicine_patient, foreignKey: "patient_id", otherKey: "med_id" });
  Patient.belongsToMany(Notes, { as: 'notes_id_Notes', through: notes_patient, foreignKey: "patient_id", otherKey: "notes_id" });
  Patient_Allergy.belongsTo(Allergies, { as: "allergy", foreignKey: "allergy_id" });
  Allergies.hasMany(Patient_Allergy, { as: "Patient_Allergies", foreignKey: "allergy_id" });
  Patient_Immunization.belongsTo(Immunizations, { as: "immunzation", foreignKey: "immunzation_id" });
  Immunizations.hasMany(Patient_Immunization, { as: "Patient_Immunizations", foreignKey: "immunzation_id" });
  Sections.belongsTo(Instructor, { as: "instructor", foreignKey: "instructor_id" });
  Instructor.hasMany(Sections, { as: "Sections", foreignKey: "instructor_id" });
  medicine_patient.belongsTo(Medicine, { as: "Medicine", foreignKey: "med_id" });
  Medicine.hasMany(medicine_patient, { as: "MedicinePatients", foreignKey: "med_id" });

  notes_patient.belongsTo(Notes, { as: "note", foreignKey: "notes_id" });
  Notes.hasMany(notes_patient, { as: "notes_patients", foreignKey: "notes_id" });
  IOandADL.belongsTo(Patient, { as: "patient", foreignKey: "patient_id" });
  Patient.hasMany(IOandADL, { as: "IOandADLs", foreignKey: "patient_id" });
  IVandLines.belongsTo(Patient, { as: "patient", foreignKey: "patient_id" });
  Patient.hasMany(IVandLines, { as: "IVandLines", foreignKey: "patient_id" });
  LabValues.belongsTo(Patient, { as: "patient", foreignKey: "patient_id" });
  Patient.hasMany(LabValues, { as: "LabValues", foreignKey: "patient_id" });
  Orders.belongsTo(Patient, { as: "patient", foreignKey: "patient_id" });
  Patient.hasMany(Orders, { as: "Orders", foreignKey: "patient_id" });
  Patient_Allergy.belongsTo(Patient, { as: "patient", foreignKey: "patient_id" });
  Patient.hasMany(Patient_Allergy, { as: "Patient_Allergies", foreignKey: "patient_id" });
  Patient_Immunization.belongsTo(Patient, { as: "patient", foreignKey: "patient_id" });
  Patient.hasMany(Patient_Immunization, { as: "Patient_Immunizations", foreignKey: "patient_id" });
  PlanofCare.belongsTo(Patient, { as: "patient", foreignKey: "patient_id" });
  Patient.hasMany(PlanofCare, { as: "PlanofCares", foreignKey: "patient_id" });
  medicine_patient.belongsTo(Patient, { as: "patient", foreignKey: "patient_id" });
  Patient.hasMany(medicine_patient, { as: "medicine_patients", foreignKey: "patient_id" });
  notes_patient.belongsTo(Patient, { as: "patient", foreignKey: "patient_id" });
  Patient.hasMany(notes_patient, { as: "notes_patients", foreignKey: "patient_id" });
  wounds.belongsTo(Patient, { as: "patient", foreignKey: "patient_id" });
  Patient.hasMany(wounds, { as: "wounds", foreignKey: "patient_id" });
  Patient.belongsTo(Sections, { as: "section", foreignKey: "section_id" });
  Sections.hasMany(Patient, { as: "Patients", foreignKey: "section_id" });
  Patient.hasMany(PatientHistory, { as: "Histories", foreignKey: "patient_id" });
  PatientHistory.belongsTo(Patient, { as: "Patient", foreignKey: "patient_id" });
  Sections.hasMany(Student, { as: 'Students', foreignKey: 'section_id' });
  Student.belongsTo(Sections, { as: 'section', foreignKey: 'section_id' });
  VitalSigns.belongsTo(Patient, { as: "patient", foreignKey: "patient_id" });
Patient.hasMany(VitalSigns, { as: "vitalSigns", foreignKey: "patient_id" });

  

  return {
    Allergies,

    IOandADL,
    IVandLines,
    Immunizations,
    Instructor,
    LabValues,
    Medicine,
    Notes,
    Orders,
    Patient,
    Patient_Allergy,
    Patient_Immunization,
    PlanofCare,
    Sections,
    SequelizeMeta,
    Student,
    medicine_patient,
    notes_patient,
    wounds,
    PatientHistory,
    VitalSigns,
  };


}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
