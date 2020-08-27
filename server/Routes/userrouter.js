var express=require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var path=require('path');

var url="mongodb+srv://dinish:dinish@cluster0-llco8.mongodb.net/test?retryWrites=true&w=majority";
//var url="mongodb://localhost/sdb"


 var booktable=require("../model/bookingmodel");
 var restaurant = require("../model/restaurantmodel");

const router=express.Router(); 
router.use(bodyparser.urlencoded({extended:true}))
 
mongoose.connect(url,function(err)
{
    if(err)
    throw err;
    else
        console.log("DB Connected..");
})
router.post('/add',function(req,res)
{ 
    console.log(req.body);
    
    var b1 = new booktable(JSON.parse(JSON.stringify(req.body.booktable)));
    // console.log(r1); 
    
    b1.save((err)=>{
        if (err) throw err;
        else
        {
            //console.log("Product Added.");
            res.send({msg:"Table Reserved."});
            
        }
    })
})


router.get("/detailView/:id",function(req,res){
    const id=req.params.id;
    restaurant.find({_id:id},function(err,result){
        if (err) throw err;
        else{
            console.log(result);
            res.send(result);
        }
    })
    
})

router.get("/searchview/:sname/:scity/:sstar",function(req,res){
    const sname=req.params.sname;
    const scity=req.params.scity;
    const sstar=req.params.sstar;
    console.log(sname,scity,sstar);
    if(sname!=undefined && scity!= undefined && sstar!=undefined){
        restaurant.find({name:sname,city:scity,star:sstar},function(err,result){
        if (err) throw err;
        else{
            //8console.log(result);
            res.send(result);
        }
    })
}
    
})

router.post("/update",function(req,res){
    product.updateMany({},{$set:{pname:"xyz"}},function(err,result){
        if (err) throw err;
        else{
            console.log(result);
        }
    })
    
})


router.get("/delete/:rid",function(req,res){ 
    console.log(req.params.rid); 
    const rid=req.params.rid; 
    restaurant.deleteOne({_id:rid},function(err,result){
        if (err) throw err;
        else{
            // res.redirect("/admin/view");   
            res.send({msg:"Restaurant Deleted."});
        }
    })
    
})
module.exports=router; 