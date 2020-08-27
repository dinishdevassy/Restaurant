var mongoose=require("mongoose");
var schema=mongoose.Schema;//instance created for schema

var bookingmodelSchema=new schema(
    {
        //rid:{type:String,required:true},
        name:{type:String,required:true},
        address:{type:String,required:true},
        phno:{type:String,required:true},
        gno:{type:Number,required:true},
        dt:{type:String,required:true},
        tm:{type:String,required:true},
        dy:{type:String,required:true}
    }
)
var bookingmodel=mongoose.model("booktable",bookingmodelSchema,"booktable");
module.exports=bookingmodel;