var express = require("express");
var router = express.Router({mergeParams:true});
var Occasion= require("../models/main")
var Comment= require("../models/comment")
var middleware = require("../middleware")


router.get("/new",middleware.isLoggedIn,function(req,res){
	//res.send("hello sucka")
	//changed file locations for ejs
	Occasion.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err)
		}else{
			res.render("comments/new",{campground:campground,currentUser:req.user})
		}
	})
	
})

router.post("/",middleware.isLoggedIn,function(req,res){
	Occasion.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err)
			redirect("/mains")
		}else{
			//console.log(req.bod.comment)
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err)
				}else{
						comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
							//console.log("new comments username will be: " + req.user.username);
					campground.comments.push(comment);
					campground.save();
					res.redirect("/moreinfo/"+campground._id)
				}
			})
		}
	})
})
//EDIT Comment
router.get("/:comment_id/edit",middleware.checkCommentOwner,function(req,res){
	Comment.findById(req.params.comment_id, function(err,foundComment){
		if(err){
			res.redirect("back")
		}
		else{
			res.render("comments/edit",{mains_id:req.params.id,comment:foundComment})
		}
		
	})
	
})

//Update comments
router.put("/:comment_id",middleware.checkCommentOwner, function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err){
			res.redirect("back")
		} else {
			res.redirect("/moreinfo/"+req.params.id)
		}
	})
})

//delete comments
router.delete("/:comment_id",middleware.checkCommentOwner, function(req,res){
	// res.send("bro")
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back")
		} else {
			res.redirect("/moreinfo/"+req.params.id)
		}
	})
})


//MIDDLEWARES





module.exports = router;