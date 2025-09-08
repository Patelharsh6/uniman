const { Sequelize } = require("sequelize");

// Create connection
const sequelize = new Sequelize("uni_record", "root", "2320", {
  host: "localhost",
  dialect: "mysql"
});

// Test connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Database connection error:", err);
  }
})();

module.exports = sequelize;
