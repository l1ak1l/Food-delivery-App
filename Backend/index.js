const express = require("express");
const app = express();
const port = 5000;
const mongodb = require("./DB.js")
mongodb()
app.get("/", (req, res) => {
    res.send("Hello World")
})
app.use(express.json())
app.use('/api',require("./Routes/Create_user"))
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)

})