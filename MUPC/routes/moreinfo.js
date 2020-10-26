var express = require("express");
var router = express.Router({mergeParams:true});
var Occasion= require("../models/main")
var middleware = require("../middleware")




router.get("/:id",middleware.isLoggedIn,function(req,res){
	Occasion.findById(req.params.id).populate("comments").exec(function(err, foundImage){
	if(err){
	console.log(err);
	} else {
	res.render("mains/moreinfo.ejs",{foundImage:foundImage,currentUser:req.user})}
})
})

//EDIT 

router.get("/:id/edit",middleware.checkImageOwner,function(req,res){
		Occasion.findById(req.params.id, function(err,foundImage){
			
					res.render("mains/edit",{main:foundImage})
					

		})
})
		

//UPDATE
router.put("/:id",middleware.checkImageOwner,function(req,res){
	Occasion.findByIdAndUpdate(req.params.id, req.body.foundIm, function(err, foundImage){
		if(err){
			res.redirect("/mains")
		} else {
			res.redirect("/moreinfo/"+ req.params.id)
			
		}
	})
})


//Destroy
// router.delete("/:id",function(req,res){
// 	//res.send("delte!!")
// 	Occasion.findByIdAndRemove(req.params.id, function(err){
// 		if(err){
// 			res.redirect("/mains")
// 		}
// 		else{
// 			res.redirect("/mains")
// 		}
// 	})
// })


router.delete("/:id",middleware.checkImageOwner,async(req, res) => {
  try {
    let foundImage = await Occasion.findById(req.params.id);
    await foundImage.remove();
    res.redirect("/mains");
  } catch (error) {
    console.log(error.message);
    res.redirect("/mains");
  }
});









module.exports = router;
