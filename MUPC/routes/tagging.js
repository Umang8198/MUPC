var express = require("express");
var router = express.Router({mergeParams:true});
var middleware = require("../middleware")
var passport=require("passport");
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

router.get("/tagging",function(req,res){
		res.render("tagging/up");
	})


router.post("/tagging",upload.single('image'),function(req,res){
	//get data from form and add it to mongodb
	//get back to campgrounds
	//res.send("hoooty")
	/////////////////////////////////////////
	cloudinary.v2.uploader.upload(req.file.path,{categorization: "aws_rek_tagging"},function(error, result){
		if(error){
			console.log(error)
			res.send(error)
		}else{
			
			//console.log(result);
			res.render("tagging/down",{image:result.url,tags:result.info.categorization.aws_rek_tagging.data});
		}
		
  
    });
})

module.exports = router;
