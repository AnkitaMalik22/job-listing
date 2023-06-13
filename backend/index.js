const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const connectDB = require("./database");
const errorHandler =  require("./middleware/errorHandler");
const {isAuthenticated} = require("./middleware/auth");
const User = require("./models/UserModel");
const Job = require("./models/JobModel");

dotenv.config();

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'))





// ============================================================ Routes  Start ================================================================

app.get("/api/health-api", (req, res) => {
  res.send("Server is up and running");
});

// ------------------------------- register ------------------------------- 
app.post("/api/register", async (req, res, next) => {
  try {
    const { name, email, mobile, password } = req.body;

    console.log(req.body);

    if(!name || !email || !mobile || !password){
      return res.status(400).json({ message: "Missing required fields" });
    }

    const isExistedUser = await User.findOne({ email });

    if (isExistedUser) {
      next(new Error("User already exists"));
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      mobile,
      password: encryptedPassword,
    });
    await user.save();

    // jwt
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    res.send({
      status: "SUCCESS",
      message: "User registerd successfully",
      recruiterName : user.name,
      token,
    });
  } catch (err) {
    next(new Error("Something went wrong! Please try after some time."));
  }
});

// -------------------------------- login ----------------------------------
app.post("/api/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password){
      return res.status(400).json({ message: "Missing required fields" });
    }
    const user = await User.findOne({ email });

    if (user) {
      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid credentials" });
      } else {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
          expiresIn: "10d",
        });

        
        res.send({
          status: "SUCCESS",
          message: "User logged in successfully",
          recruiterName : user.name,
          token,
        });
      }
    } else {
      next(new Error("User not found"));
    }
  } catch (err) {
    next(new Error("Something went wrong! Please try after some time."));
  }
});

// -------------protected route --- create job post -------------------------

app.post("/api/create-job",isAuthenticated, async (req, res, next) => {
  try {
    const { companyName,logoURL,position,salary,jobType,remote,location,description,aboutCompany,skills, date } = req.body;

    if (!companyName || !logoURL || !position || !salary || !jobType || !remote || !location || !description || !aboutCompany || !skills ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const lowercaseSkills = skills.map((skill) => skill.toLowerCase());  
    console.log(req.body);
    await Job.create({
      companyName,
      logoURL,
      position,
      salary,
      jobType,
      remote,
      location,
      description,
      aboutCompany,
      skills :lowercaseSkills,
      date,
    });

    res.send({
      status: "SUCCESS",
      message: "Job posted successfully",
    });
  } catch (err) {
    next(new Error("Something went wrong! Please try after some time."));
  }
});

// -----------------------  get filtered jobs ------------------------------


app.get("/api/jobs/:skills", async (req, res, next) => {
  try {
   const skills = req.params.skills;
   const parsedSkills = JSON.parse(skills)
    const lowercaseSkills = parsedSkills.map((skill) => skill.toLowerCase());
    console.log(lowercaseSkills);
    const jobs = await Job.find({ skills: { $in: lowercaseSkills } });
   
    res.send({
      status: "SUCCESS",
      message: "Jobs fetched successfully",
      data: jobs,
    });
  } catch (err) {
    console.log(err);
    next(new Error("Something went wrong! Please try after some time."));
  }

});

// ------------------ detail description of a job ----------------------------

app.get("/api/job/:id",async(req,res,next)=>{
  const id = req.params.id;
  try{
    const job = await Job.findById(id);
    res.send({
      status: "SUCCESS",
      message: "Job fetched successfully",
      job : job
    })
  }
  catch(err){
    next(new Error("Something went wrong! Please try after some time."));
  }
})


// --------------------------------------- edit job post -----------------------

app.put("/api/job/:id",async(req,res,next)=>{
  const id = req.params.id;
  const { companyName,logoURL,position,salary,jobType,remote,location,description,aboutCompany,skills, date } = req.body;
  try{
 await Job.findByIdAndUpdate(id, { companyName,logoURL,position,salary,jobType,remote,location,description,aboutCompany,skills, date });

    res.send({
      status : "SUCCESS",
      message : "Job Updated Successfully!"
    })
  }
  catch(err){
    console.log(err)
    next(new Error("Something went wrong! Please try after some time."));
  }
    

  })

// ============================================================ Routes End ================================================================




// Connect to MongoDB
connectDB();

// start server
app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
