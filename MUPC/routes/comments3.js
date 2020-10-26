var express = require("express");
var router = express.Router({mergeParams:true});
var middleware = require("../middleware")
var Comment= require("../models/comment")
var Archive= require("../models/archive");


router.get("/new",middleware.isLoggedIn,function(req,res){
	//res.send("hello sucka")
	//changed file locations for ejs
	Archive.findById(req.params.rid,function(err,foundPhoto){
		if(err){
			console.log(err)
		}else{
			console.log(foundPhoto)
			res.render("comments3/new",{campground:foundPhoto,currentUser:req.user})
		}
	})
	
})


router.post("/",middleware.isLoggedIn,function(req,res){
	Archive.findById(req.params.rid, function(err, foundPhoto){
		if(err){
			console.log(err)
			redirect("/archive")
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
					foundPhoto.comments.push(comment);
					foundPhoto.save();
					res.redirect("/archive/"+foundPhoto._id)
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
			res.render("comments3/edit",{mains_id:req.params.rid,comment:foundComment,currentUser:req.user,commentID:req.params.comment_id})
		}
		
	})
	
})

//Update comments
router.put("/:comment_id",middleware.checkCommentOwner, function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err){
			res.redirect("back")
		} else {
			res.redirect("/archive/"+req.params.rid)
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
			res.redirect("/archive/"+req.params.rid)
		}
	})
})





module.exports = router;