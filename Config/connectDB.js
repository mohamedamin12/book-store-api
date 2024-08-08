const url = process.env.MONGO_URL;
const mongoose = require("mongoose");
const ConnectToDB = async() => {
  try {
  await  mongoose.connect(url)
    console.log("connected to db");
  }catch (error){
    console.log( "Error Connected" ,error);
  }  
}

module.exports = ConnectToDB;