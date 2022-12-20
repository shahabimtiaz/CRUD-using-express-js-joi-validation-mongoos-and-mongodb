var express = require("express");
var bodyParser = require("body-parser");
var Student = require("../models/Student");
var cors = require("cors");
var joi = require("joi");
var restApiRouter = express.Router();
restApiRouter.use(cors());
restApiRouter.use(bodyParser.urlencoded({ extended: false }));
restApiRouter.use(bodyParser.json());
// store a student
restApiRouter.post("/students", async (req, res) => {
  //making schema of joi validation
  var data = req.body;
  data = { ...data, id: Student.length };
  var schema = joi.object().keys({
    id: joi.number().min(1).max(1000).required(),
    name: joi.string().min(3).max(10).required(),
    class: joi.string().min(3).max(20).required(),
    age: joi.number().min(10).max(35).required(),
  });

  schema.validateAsync(data).then(() => {
          let newStudent = Student({
            id: Student.length,
            name: req.body.name,
            class: req.body.class,
            age: parseInt(req.body.age),
          });
          newStudent.save();
          res.send(
            `Data of student with name ${req.body.name} is stored successfully`
          );
    })
    .catch((err) => {
      res.json(err.details[0].message);
    });
});
//find all students
restApiRouter.get("/students", async (req, res) => {
  let data = await Student.find({}).exec();
  res.json(data);
  console.log(Student.length);
});
//find single student
restApiRouter.get("/students/:id", async (req, res) => {
  var data = await Student.findOne({ id: parseInt(req.params.id) }).exec();
  data === null ? res.send("Id is not found") : res.json(data);
});
// deleting student
restApiRouter.delete("/students/:id", async (req, res) => {
  let deleteUser = await Student.deleteOne({ id: req.params.id }).exec();
  console.log(deleteUser);
  !deleteUser.acknowledged
    ? res.send("User not found!")
    : res.send(`${req.params.id}: ID record is deleted permanently!`);
});
// updating student
restApiRouter.put("/students/:id", async (req, res) => {
  console.log(req.body);
  let id = parseInt(req.params.id);
  let student = await Student.findOne({ id: id }).exec();

  let data = req.body;
  req.body.id = id;
  console.log(student._id.toString());
  let updatedData = Student.findByIdAndUpdate(student._id, {
    $set: data,
  }).exec();
  if (updatedData) {
    res.send("Data is updated successfully");
  } else {
    res.send("User not found!!");
  }
});
module.exports = restApiRouter;
