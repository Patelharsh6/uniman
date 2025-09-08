const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const bodyParser = require("body-parser");
const bcrypt=require("bcrypt");

// Import models
const User = require("./models/User");
const Student = require("./models/Student");

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // for form submissions
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.engine("ejs", ejsMate);

// Async IIFE to handle Sequelize sync
(async () => {
  try {
    // Sync tables (development only: alter true)
    await User.sync({ alter: true });
    await Student.sync({ alter: true });
    console.log("Database tables synced successfully.");
  } catch (err) {
    console.error("Error syncing tables:", err);
  }
})();

// Routes
app.get("/admin/add", (req, res) => {
  res.send("request");
});

app.post( "/signup" , async (req,res)=>{

    try{
        let { Email } = req.body;

        const existingUser = await User.findOne({ where: { Email} });
        if (existingUser) {
        return res.status(400).json({ message: "Email allrady registered!" });
        }

        const newUser = await User.create(req.body);

        res.status(201).json({ message: "User registered successfully!", user: newUser });
    }catch(err){
        console.error("Error registering user:", err);
        res.status(500).json({ message: "Server error" });
    }
    
});

app.post("/login", async (req, res) => {
  try {
    const { Email, Password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { Email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare entered password with stored hash
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Success response
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.User_ID,
        name: `${user.First_Name} ${user.Last_Name}`,
        email: user.Email,
        role: user.Role
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/", (req, res) => {
  res.render("home", { title: "harsh" });
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
