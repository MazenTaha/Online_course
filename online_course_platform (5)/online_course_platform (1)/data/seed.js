exports.importDataToDB = (Model, list) => {
  Model.create(list)
    .then(() => {
      console.log("Data imported success");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      process.exit();
    });
};
exports.emptyDB = (Model) => {
  Model.deleteMany()
    .then(() => {
      console.log("Data deleted success");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      process.exit();
    });
};
