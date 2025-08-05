
const app = require("./app");

const dotenv = require("dotenv");

const mongoose = require("mongoose");

dotenv.config({ path: "./.env" });

const PortNumber = process.env.PORT || 8080;

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


app.listen(PortNumber, () => {
  console.log(`server is running on port ${PortNumber}`);
});
