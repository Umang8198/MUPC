//all middlewares
var Occasion= require("../models/main");
var ReviewPage= require("../models/review");
var Comment= require("../models/comment")
var Archive= require("../models/archive");
var middlewareObj={}

middlewareObj.checkImageOwner = function (req,res,next){
	if(req.isAuthenticated() ){
		Occasion.findById(req.params.id, function(err,foundImage){
			if(err){
				console.log(err)
				res.redirect("back")
			} else {
				//does the user own the image
				if(foundImage.author.id.equals(req.user._id) || req.user.isAdmin){
					next();
					
				}else{
					res.redirect("back")
					
				}
				
			}
		})
		
	} else {
		res.redirect("back")
	}

	}

//for review
middlewareObj.checkRevImageOwner = function (req,res,next){
	if(req.isAuthenticated()){
		ReviewPage.findById(req.params.rid, function(err,foundImage){
			if(err){
				console.log(err)
				res.redirect("back")
			} else {
				//does the user own the image
				console.log("hey")
				//console.log(foundImage)
				console.log(foundImage.author)
				
				if(foundImage.author.id.equals(req.user._id) || req.user.isAdmin){
					next();
					
				}else{
					res.redirect("back")
					
				}
				
			}
		})
	}
}

middlewareObj.checkArchiveImageOwner = function (req,res,next){
	if(req.isAuthenticated()){
		Archive.findById(req.params.rid, function(err,foundImage){
			if(err){
				console.log(err)
				res.redirect("back")
			} else {
				//does the user own the image
				console.log("hey")
				//console.log(foundImage)
				console.log(foundImage.author)
				
				if(foundImage.author.id.equals(req.user._id) || req.user.isAdmin){
					next();
					
				}else{
					res.redirect("back")
					
				}
				
			}
		})
	}
}



middlewareObj.checkCommentOwner = function (req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err,foundComment){
			if(err){
				console.log(err)
				res.redirect("back")
			} else {
				//does the user own the image
				if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
					next();
					
				}else{
					res.redirect("back")
					
				}
				
			}
		})
		
	} else {
		res.redirect("back")
	}
}


middlewareObj.isLoggedIn =function (req,res,next){
	if(req.isAuthenticated()){
		//req.flash("success","Logged you in")
		return next()
	} 
	//this does not display messsage
	req.flash("error", "Please Login First")
	res.redirect("/login")
}






module.exports = middlewareObj
	
	
	