const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const bcrypt = require("bcrypt");

const User = sequelize.define("User", {
  User_ID: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  First_Name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "First name cannot be empty" },
      len: { args: [2, 50], msg: "First name must be 2-50 characters" }
    }
  },
  Last_Name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Last name cannot be empty" },
      len: { args: [2, 50], msg: "Last name must be 2-50 characters" }
    }
  },
  DOB: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    validate: {
      isDate: { msg: "DOB must be a valid date" }
    }
  },
  Gender: {
    type: DataTypes.ENUM("M", "F", "O"),
    allowNull: false,
    validate: {
      isIn: {
        args: [["M", "F", "O"]],
        msg: "Gender must be M, F, or O"
      }
    }
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: "Must be a valid email address" }
    }
  },
  Phone: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: {
        args: /^[0-9]{10,15}$/,
        msg: "Phone number must be 10-15 digits"
      }
    }
  },
  Address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  Role: {
    type: DataTypes.ENUM("Student", "Faculty", "Admin"),
    allowNull: false,
    validate: {
      isIn: {
        args: [["Student", "Faculty", "Admin"]],
        msg: "Role must be Student, Faculty, or Admin"
      }
    }
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: { args: [8, 100], msg: "Password must be at least 8 characters long" }
    }
  }
}, {
  tableName: "Users",
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.Password = await bcrypt.hash(user.Password, salt);
    },
    beforeUpdate: async (user) => {
      if (user.changed("Password")) {
        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(user.Password, salt);
      }
    }
  }
});

// Do NOT sync Student here! Sync tables in server.js
// User.sync({ alter: true }); // optional: can sync here if you want

module.exports = User;
