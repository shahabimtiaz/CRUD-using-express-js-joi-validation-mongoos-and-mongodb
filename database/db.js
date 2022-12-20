//database declaration
var mongoose = require('mongoose');
var connection = mongoose.connection;
mongoose.set('strictQuery', false);
connection.once("connected", () => console.log("Database Connected ~"))
connection.on("error", error => console.log("Database Error: ", error))
mongoose.connect("mongodb://localhost:27017/college", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
module.exports = connection;