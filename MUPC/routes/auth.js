var express = require("express");
var router = express.Router({mergeParams:true});
var passport=require("passport");
var User= require("../models/user");
var Occasion= require("../models/main");
var middleware = require("../middleware")

router.get("/",function(req,res){
	console.log("Someone visited landing page!!")
	res.render("landing")
})
router.get("/about",function(req,res){
	console.log("about page")
	res.render("about",{currentUser:req.user})
})
//Auth routes====================================================

//------------------------------
//sign up form
router.get("/register",function(req,res){
	res.render("register",{currentUser:req.user})
})

//sign up post req
router.post("/register", function(req,res){
	var newUser = new User({
		userimage: req.body.userImage,
		username: req.body.username,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email
	});
	if(req.body.adminCode ==="Secretcode123"){
		newUser.isAdmin = true;
	}
	User.register(newUser, req.body.password, function(err,user){
		if(err){
			req.flash("error",err.message)
			console.log(err);
			return res.render("register")
		}
		passport.authenticate("local")(req,res,function(){
			//res.send("OK")
			req.flash("success", "Welcome to Picto-View Hub "+user.username)
			res.redirect("/mains");
		})
	})
})

//log in form
router.get("/login",function(req,res){
	
	//req.flash("success", "Logged you in")
	res.render("login",{currentUser:req.user})
})

router.post("/login",passport.authenticate("local", {
	successRedirect: "/mains",
	failureRedirect: "/login"
}),function(req,res){
	 
})

router.get("/logout", function(req,res){
	//res.send("Broooo")
	req.flash("success", "Logged you out")
	req.logout();
	res.redirect("/mains")
})





module.exports = router;