const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

mongoose.set("strictQuery", true);

mongoose
  .connect("mongodb://Mahdi:4iMfYsmX8ABmvwFf@ac-uxeijgl-shard-00-00.ofqyds8.mongodb.net:27017,ac-uxeijgl-shard-00-01.ofqyds8.mongodb.net:27017,ac-uxeijgl-shard-00-02.ofqyds8.mongodb.net:27017/?ssl=true&replicaSet=atlas-xn9iuv-shard-0&authSource=admin&retryWrites=true&w=majority")
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
