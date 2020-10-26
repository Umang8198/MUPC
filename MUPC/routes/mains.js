var express = require("express");
var router = express.Router();
var Occasion= require("../models/main");
var middleware = require("../middleware")
//
var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'umasha', 
  api_key: '764627959446479', 
  api_secret: 'Bwq3rA6JB-wm8wc4c3fT3TWfFus'
});
//

router.get("/",function(req,res){
			 Occasion.find({}, function(err,alloccasions){

				if(err){
				   console.log(err);
			   } else {
				   //console.log(allcampgrounds)
				  res.render("mains/mains",{occasions:alloccasions,currentUser:req.user});
			   }



				})
})

router.post("/",middleware.isLoggedIn,upload.single('image'),function(req,res){
	//get data from form and add it to mongodb
	//get back to campgrounds
	//res.send("hoooty")
	/////////////////////////////////////////
	cloudinary.uploader.upload(req.file.path, function(result) {
  // add cloudinary url for the image to the campground object under image property
  req.body.campground.image = result.secure_url;
  // add author to campground
  req.body.campground.author = {
    id: req.user._id,
    username: req.user.username
  }
  Occasion.create(req.body.campground, function(err, campground) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('back');
    }
    res.redirect('/mains/' + campground.id);
  });
});
	////////////////////////////////////////
	// console.log(req.user)
	// var name =req.body.name
	// var description=req.body.description
	// var author={
	// 	id:req.user._id,
	// 	username:req.user.username
	// }
	
	// var image =req.body.image
	// var newEvent ={name:name,image:image,description:description,author:author}
	// Occasion.create(newEvent,function(err,newCreate){
	// 	if(err){
	// 		console.log("hey an error")
	// 		console.log(err)
	// 	}else{
	// 		console.log(newCreate);
	// 		res.redirect("/mains")
	// 	}
	// })
	
})




router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("mains/new",{currentUser:req.user})
})


router.get("/:id",function(req,res){
	console.log("More info page visited")
	// Occasion.findById(req.params.id, function(err, foundEvent){
	// if(err){
	// console.log(err);
	// } else {
			
			//req.params.id
	Occasion.findById(req.params.id,function(err,foundCampground){
		if(err){
			console.log(err)
		}else{
			
			
			    var camp=foundCampground.name
				Occasion.find({"name":camp}, function(err,somecampgrounds){
				if(err){
					console.log(err);
				} else{
					res.render("mains/show",{campgrounds:somecampgrounds,category:camp,currentUser:req.user})
				}
			    })
			
			
	 	}
	 })
			
			// console.log(foundEvent)
			// //render show template with that campground
			// //res.render("show", {campgrounds: foundEvent});
			// }
			// });
	
})

// //diff1================
// router.get("/:id",function(req,res){
// 	Occasion.findById(req.params.id).populate("comments").exec(function(err, foundImage){
// 	if(err){
// 	console.log(err);
// 	} else {
// 	res.render("mains/moreinfo.ejs",{foundImage:foundImage,currentUser:req.user.username})}
// })
// })
//edit campgrounds
//	router.get("/:id/edit",function(req,res){
	///main.foundById(req.params.id,function(err,foundMain){
		//if(err){
			//res.redirect("/mains")
		//}else{
		//	res.render("mains/edit",{main:foundMain});
		//}
	//});
	
//});
//

module.exports = router