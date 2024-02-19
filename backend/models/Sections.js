const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Sections', {
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Student',
        key: 'user_id'
      }
    },
    instructor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Instructor',
        key: 'instructor_id'
      }
    },
    section_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'Sections',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "section_id" },
          { name: "instructor_id" },
          { name: "student_id" },
        ]
      },
      {
        name: "section_fk2_idx",
        using: "BTREE",
        fields: [
          { name: "instructor_id" },
        ]
      },
      {
        name: "section_fk1",
        using: "BTREE",
        fields: [
          { name: "student_id" },
        ]
      },
    ]
  });
};
