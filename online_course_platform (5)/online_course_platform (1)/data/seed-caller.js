const fs =require ('fs')
const mongoose = require('mongoose')
//const instructor = require('../model/instructorModel')
const certificate = require('../model/certificateModel')
const assignment = require('../model/assignmentModel')
const course = require('../model/courseModel')
const quiz = require('../model/quizModel')
const enrollment = require('../model/enrollmentModel')
const user = require('../model/userModel')



const {importDataToDB,emptyDB} = require('./seed')
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

console.log('Environment variables loaded');

const dbAtlasString = process.env.DB.replace(
  "<db_password>",
  process.env.DB_PASSWORD
);
mongoose
  .connect(dbAtlasString)
  .then(() => {
    console.log("DB connection successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });
const obj ={
    certificate:{model:certificate,filePath:`${__dirname}/certificate.json`}, 
   // instructor:{model:instructor,filePath:`${__dirname}/instructor.json`},
        assignment:{model:assignment,filePath:`${__dirname}/assignment.json`}, 
    course:{model:course,filePath:`${__dirname}/course.json`}, 
    quiz:{model:quiz,filePath:`${__dirname}/quiz.json`}, 
        enrollment:{model:enrollment,filePath:`${__dirname}/enrollment.json`}, 
                user:{model:user,filePath:`${__dirname}/user.json`}, 



};
const list = JSON.parse(
    fs.readFileSync(obj[process.argv[3]].filePath,'utf-8')
);
console.log(process.argv);

if(process.argv[2]==="--import"){
    importDataToDB(obj[process.argv[3]].model,list)
}else if(process.argv[2]==="--delete"){
    emptyDB(obj[process.argv[3]].model)
}
