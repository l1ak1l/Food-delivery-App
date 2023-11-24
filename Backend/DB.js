const mongoose = require("mongoose");
const mongoURI= 'mongodb+srv://FoodApp:Alikhan786@cluster0.0jwfrku.mongodb.net/Foodapp?retryWrites=true&w=majority'
const mongodb = async ()=>{
    await mongoose.connect(mongoURI,{ useNewUrlParser : true },async (err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("Connected")
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(function(err,data){
                if(err){
                    console.log("Error Ocurred",err)
                }
                else{
                }
            })

        }
    })
}
module.exports = mongodb;