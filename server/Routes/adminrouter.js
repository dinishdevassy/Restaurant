var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var path = require('path');

var url = "mongodb+srv://dinish:dinish@cluster0-llco8.mongodb.net/test?retryWrites=true&w=majority";
//var url="mongodb://localhost/sdb"

var multer = require("multer");

var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(path.dirname(__dirname), '/public/uploads'));
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

var upload = multer({ storage: storage }).single('photo');


var restaurant = require("../model/restaurantmodel");

const router = express.Router();
router.use(bodyparser.urlencoded({ extended: true }))

mongoose.connect(url, function (err) {
    if (err)
        throw err;
    else
        console.log("DB Connected..");
})
router.post('/add', upload, function (req, res) {
    console.log(req.body);
    console.log(req.file);

    var r1 = new restaurant(req.body);
    r1.image = req.file.filename;
    console.log(r1);

    r1.save((err) => {
        if (err) throw err;
        else {
            //console.log("Product Added.");
            res.send({ msg: "Restaurant Added." });

        }
    })
})


router.get("/view", function (req, res) {
    restaurant.find({}, function (err, result) {
        if (err) throw err;
        else {
            //8console.log(result);
            res.send(result);
        }
    })

})

router.post("/searchview", function (req, res) {

    console.log(req.body);
    
    let sdata=JSON.parse(JSON.stringify(req.body));
   
    
    
    const sname=(sdata.sname==undefined)?" ":sdata.sname;
    const scity=(sdata.scity==undefined)?" ":sdata.scity;
    const sstar=(sdata.sstar==undefined)?" ":sdata.sstar;

   
    
    
    
   
    
        restaurant.find({$or:[{ name: sname}, {city: scity}, {star: sstar }]}, function (err, result) {
            if (err) throw err;
            else {
                
                res.send(result);
            }
        });

})

router.post("/update", function (req, res) {
    product.updateMany({}, { $set: { pname: "xyz" } }, function (err, result) {
        if (err) throw err;
        else {
            console.log(result);
        }
    })

})

router.get("/view/:image", function (req, res) {
    let dir = path.join(path.dirname(__dirname), '/public/uploads', req.params.image);
    console.log(dir);

    res.sendFile(dir);
})


router.get("/delete/:rid", function (req, res) {
    console.log(req.params.rid);
    const rid = req.params.rid;
    restaurant.deleteOne({ _id: rid }, function (err, result) {
        if (err) throw err;
        else {
            // res.redirect("/admin/view");   
            res.send({ msg: "Restaurant Deleted." });
        }
    })

})
module.exports = router; 