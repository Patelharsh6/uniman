const { DataTypes } = require("sequelize");
const sequelize = require("./index"); // db connection
const User = require("./User"); // User model

const Student = sequelize.define("Student", {
  Student_ID: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // auto-generate random UUID
    primaryKey: true
  },
  User_ID: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: "User_ID"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  },
  Enrollment_No: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: "Enrollment number cannot be empty" },
      len: { args: [5, 20], msg: "Enrollment number must be 5-20 characters" }
    }
  },
  Department_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: "Department ID must be an integer" }
    }
  },
  Admission_Year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: "Admission Year must be an integer" },
      min: { args: [2000], msg: "Admission Year cannot be before 2000" },
      max: { args: [2100], msg: "Admission Year cannot be after 2100" }
    }
  },
  Current_Semester: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      isInt: { msg: "Current Semester must be an integer" },
      min: { args: [1], msg: "Semester cannot be less than 1" },
      max: { args: [12], msg: "Semester cannot be more than 12" }
    }
  }
}, {
  tableName: "Students",
  timestamps: true
});

// Define association
Student.belongsTo(User, { foreignKey: "User_ID", as: "user" });

// ✅ Do not sync here in model for production
// Sync should be handled in server.js after all models are imported
// You can optionally sync here in development if needed
// (async () => {
//   await Student.sync({ alter: true });
// })();

module.exports = Student;
