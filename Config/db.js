const mongoose = require('mongoose');
const connectDb = async function(){
    // mongoose.connect(process.env.MONGO_URL)
    mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/authorization")
    .then((conn)=>{
        console.log(`connected to DB:${conn.connection.host}`);
    })
    .catch((err)=>{
        console.log(err.message);
    })
}
module.exports=connectDb;