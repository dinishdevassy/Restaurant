var express=require("express");
const path=require("path");
var bodyparser = require("body-parser");
// var userrouter=require("./Routes/userrouter");
 var adminrouter=require("./Routes/adminrouter");
 var userrouter=require("./Routes/userrouter");

const app=express();


app.use(express.static(path.join(__dirname,"/public")));
app.use(bodyparser.urlencoded({extended:true}))

app.use(bodyparser.json());
app.use("/admin",adminrouter);
app.use("/user",userrouter); 

app.listen("8080",function(req,res){
    console.log("Server Started Listening...")
})

// app.get("/data",function(req,res){
//     res.send({msg:'data from server'});
// })