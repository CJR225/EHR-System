module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('student', {
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    section_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Sections',
        key: 'section_id'
      }
    }
  }, {
    sequelize,
    tableName: 'Student',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "student_fk1_idx",
        using: "BTREE",
        fields: [
          { name: "section_id" },
        ]
      },
    ]
  });
  return Student
};
