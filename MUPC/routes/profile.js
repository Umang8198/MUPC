var express = require("express");
var router = express.Router({mergeParams:true});
var passport=require("passport");
var User= require("../models/user");
var Occasion= require("../models/main");
var middleware = require("../middleware");
var ReviewPage= require("../models/review");


router.get("/users", middleware.isLoggedIn, function(req,res){
	User.find({}, function(err,foundUsers){
		if(err){
			req.flash("error","something went wrong")
			res.redirect("/mains")
		} else {
			res.render("users/show",{foundUsers:foundUsers,currentUser:req.user})
		}
		
	})
})
router.get("/users/:bid", middleware.isLoggedIn,function(req,res){
	User.findById(req.params.bid, function(err,foundUser){
		if(err){
			req.flash("error","something went wrong")
			res.redirect("/mains")
		}
		//eval(require("locus"))
		ReviewPage.find().where("author.id").equals(foundUser.id).exec(function(err, Img){
			  	res.render("users/moreinfo", {userr: foundUser,Img:Img,currentUser:req.user})
			})
		
	})
})

module.exports = router;