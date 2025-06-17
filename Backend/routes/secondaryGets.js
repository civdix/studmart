const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Test endpoint
router.get("/test", (req, res) => {
  res.json({ message: "API is working!" });
});

let collegejson = [];

try {
  // Read the colleges.json file
  const collegesPath = path.join(__dirname, "colleges.json");

  if (fs.existsSync(collegesPath)) {
    const fileContent = fs.readFileSync(collegesPath, "utf8");
    collegejson = JSON.parse(fileContent);
    // console.log(
    //   "Successfully loaded colleges.json. Number of colleges:",
    //   collegejson.length
    // );
  } else {
    console.error("colleges.json file not found at:", collegesPath);
  }
} catch (error) {
  console.error("Error loading colleges.json:", error);
}

// College search endpoint
router.get("/getCollege", (req, res) => {
  try {
    // Get the college name from query parameters
    const { college } = req.query;

    if (!college) {
      console.log("No college name provided in query");
      return res
        .status(400)
        .json({ success: false, message: "College name is required" });
    }

    searchCollege(college, (foundColleges) => {
      // console.log("Found colleges:", foundColleges.length);
      // Check if we found any colleges
      if (foundColleges.length > 0) {
        res.status(200).json({ success: true, foundColleges });
      } else {
        res.status(404).json({ success: false, foundColleges: [] });
      }
    });
  } catch (error) {
    console.error("Error in getCollege endpoint:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Function to search for colleges by name
const searchCollege = (name, callback) => {
  try {
    if (name) {
      // Filter colleges based on name
      const foundColleges = collegejson.filter((college) =>
        college.college.toLowerCase().includes(name.toLowerCase())
      );
      callback(foundColleges);
    } else {
      callback([]);
    }
  } catch (error) {
    console.error("Error in searchCollege:", error);
    callback([]);
  }
};

// Log all routes

module.exports = router;
