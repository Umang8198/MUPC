var express = require("express");
var router = express.Router({mergeParams:true});
var passport=require("passport");
var User= require("../models/user");
var Archive= require("../models/archive");
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


router.get("/archive",middleware.isLoggedIn,function(req,res){
	Archive.find({}, function(err,rImgs){

				if(err){
				   console.log(err);
			   } else {
				   //console.log(allcomps)
				   //res.render("reviews/show",{allcomps:allcomps,currentUser:req.user});
				   res.render("archives/show",{rImgs:rImgs,currentUser:req.user})
			   }



				})
	
})

router.post("/archive",middleware.isLoggedIn,upload.single('image'),function(req,res){
	////////////////////////////////////////
		cloudinary.uploader.upload(req.file.path, function(result) {
  // add cloudinary url for the image to the campground object under image property
  req.body.campground.image = result.secure_url;
  // add author to campground
  req.body.campground.author = {
    id: req.user._id,
    username: req.user.username
  }
  Archive.create(req.body.campground, function(err, campground) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('back');
    }
    res.redirect('/archive/' + campground.id);
  });
});
	////////////////////////////////////////
	//console.log(req.body.description)
	// var title =req.body.title
	// var description=req.body.description
	// var author={
	// 	id:req.user._id,
	// 	username:req.user.username
	// }
	// var date=req.body.date
	// var image=req.body.image
	// var newComp ={title:title,date:date,description:description,author:author,image:image}
	// Archive.create(newComp,function(err,newCreate){
	// 	if(err){
	// 		console.log("hey an error")
	// 		console.log(err)
	// 	}else{
	// 		//console.log(newCreate);
	// 		res.redirect("/archive")
	// 	}
	// })
})

router.get("/archive/new",function(req,res){
	res.render("archives/new")
})

router.get("/archive/:rid",middleware.isLoggedIn,function(req,res){
	Archive.findById(req.params.rid).populate("comments").exec(function(err,foundComp){
		if(err){
			console.log(err)
		}else{
			//console.log(foundComp)
			res.render("archives/rpage",{foundComp:foundComp,currentUser:req.user})
		}
})
})

// router.get("/:id",middleware.isLoggedIn,function(req,res){
// 	Occasion.findById(req.params.id).populate("comments").exec(function(err, foundImage){
// 	if(err){
// 	console.log(err);
// 	} else {
// 	res.render("mains/moreinfo.ejs",{foundImage:foundImage,currentUser:req.user})}
// })
// })

//EDIT
router.get("/archive/:rid/edit",middleware.checkArchiveImageOwner,function(req,res){
		Archive.findById(req.params.rid, function(err,foundImage){
			
					res.render("archives/edit",{main:foundImage,currentUser:req.user})
					

		})
})
		

//UPDATE
router.put("/archive/:rid",middleware.checkArchiveImageOwner,function(req,res){
	Archive.findByIdAndUpdate(req.params.rid, req.body.foundIm, function(err, foundImage){
		if(err){
			res.redirect("/archive")
		} else {
			res.redirect("/archive/"+ req.params.rid)
			
		}
	})
})


router.delete("/archive/:rid",middleware.checkArchiveImageOwner,async(req, res) => {
  try {
    let foundImage = await Archive.findById(req.params.rid);
    await foundImage.remove();
    res.redirect("/archive");
  } catch (error) {
    console.log(error.message);
    res.redirect("/archive");
  }
});


module.exports = router;