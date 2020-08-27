var mongoose=require("mongoose");
var schema=mongoose.Schema;//instance created for schema

var restaurantschema=new schema(
    {
        //rid:{type:String,required:true},
        name:{type:String,required:true},
        city:{type:String,required:true},
        star:{type:String,required:true},
        opentime:{type:String},
        closetime:{type:String},
        address:{type:String},
        phno:{type:String},
        image:{type:String,required:true},
    }
)
var restaurantmodel=mongoose.model("restaurant",restaurantschema,"restaurant");
module.exports=restaurantmodel;