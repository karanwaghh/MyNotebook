const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = () => {
    mongoose.connect(process.env.MongoURI)
    .then(() => console.log("DB CONNECTION SUCCESS"))
    .catch((err) => {
        console.log("DB CONNECTION ISSUES");
        console.error(err.message);
        process.exit(1);
    });
};

module.exports = dbConnection;
