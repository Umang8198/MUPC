var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")
//for importing models
var Occasion=require("./models/main")
var Comment=require("./models/comment")
var User=require("./models/user")
//auth
var passport=require("passport") 
var LocalStrategy=require("passport-local")
var passportLocalMongoose=require("passport-local-mongoose")
//for edit and update
var methodOverride = require("method-override")
//flash messages
var flash=require("connect-flash")



//seed data
var seedDB= require("./seeds")
//seedDB();

var commentRoutes = require("./routes/comments"),
	mainRoutes = require("./routes/mains"),
 	authRoutes = require("./routes/auth"),
	moreinfoRoutes = require("./routes/moreinfo.js"),
	profileRoutes =require("./routes/profile.js"),
    reviewRoutes = require("./routes/review.js"),
	comment2Routes = require("./routes/comments2.js"),
	comment3Routes = require("./routes/comments3.js"),
    archiveRoutes = require("./routes/archive.js")
    

mongoose.connect("mongodb://localhost:27017/mupc",{useNewUrlParser: true,useUnifiedTopology: true})

var app=express()
app.use(flash())
app.set("view engine","ejs");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
//app.use(express.static(__dirname + "/public"))
// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret:"Medicaps is the best university",
	resave: false,
	saveUninitialized: false
}));

app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//user as middleware
app.use(function(req, res, next){
	res.locals.currentUser= req.User
	res.locals.error= req.flash("error")
	res.locals.success= req.flash("success")
	next();
})










// var events = [
// 		{name:"MS2014", image:"https://images.pexels.com/photos/2666598/pexels-photo-2666598.jpeg?auto=compress&cs=tinysrgb&h=350"},
// 		{name:"MS2015", image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350"},
// 	{name:"MS2016", image:"https://images.pexels.com/photos/2666598/pexels-photo-2666598.jpeg?auto=compress&cs=tinysrgb&h=350"},
// 		{name:"MS2017", image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350"},
// 	{name:"MS2018", image:"https://images.pexels.com/photos/2666598/pexels-photo-2666598.jpeg?auto=compress&cs=tinysrgb&h=350"},
// 		{name:"MS2019", image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350"},
// 	{name:"MS2020", image:"https://images.pexels.com/photos/2666598/pexels-photo-2666598.jpeg?auto=compress&cs=tinysrgb&h=350"},
// 		{name:"MS2021", image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350"},
// 		{name:"MS2022", image:"https://images.pexels.com/photos/4555526/pexels-photo-4555526.jpeg?auto=compress&cs=tinysrgb&h=350"}
// 	]

// var occasionSchema =new mongoose.Schema({
// 	name: String,
// 	image:String,
// 	description: String
// })

// var Occasion =mongoose.model("Occasion", occasionSchema)

// Occasion.create(
// 		{
// 			name:"Moonstone 2004",
// 			description:" The first moonstone",
// 			image:{
// 				data:"",
// 				contentType:"image/png"
// 			}
			
			
// 		},function(err,campground){
// 			if(err){
// 				console.log(err)
// 			} else{
// 				console.log("New camp")
// 				console.log(campground)
// 			}
// 		})


// PASSPORT CONFIGURATION
// app.use(require("express-session")({
// 	secret: "Once again Rusty is cutest dog",
// 	resave: false,
// 	saveUninitialized: false
// }))
// app.use(passport.initialize())
// app.use(passport.session())
// passport.use(new LocalStrategy(User.authenticate()))
// passport.serialzeUser(User.serialzeUser())
// passport.deserialzeUser(User.deserialzeUser())




// app.get("/",function(req,res){
// 	console.log("Someone visited landing page!!")
// 	res.render("landing")
// })
// app.get("/about",function(req,res){
// 	console.log("about page")
// 	res.render("about"/*,{currentUser:req.user}*/)
// })


// app.get("/mains",function(req,res){
// 			 Occasion.find({}, function(err,alloccasions){

// 				if(err){
// 				   console.log(err);
// 			   } else {
// 				   //console.log(allcampgrounds)
// 				  res.render("mains/mains",{occasions:alloccasions,currentUser:req.user});
// 			   }



// 				})
// })

// app.post("/mains",isLoggedIn,function(req,res){
// 	//get data from form and add it to mongodb
// 	//get back to campgrounds
// 	//res.send("hoooty")
// 	var name =req.body.name
// 	var description=req.body.description
// 	var image =req.body.image
// 	var newEvent ={name:name,image:image,description:description}
// 	Occasion.create(newEvent,function(err,newCreate){
// 		if(err){
// 			console.log("hey an error")
// 			console.log(err)
// 		}else{
// 			res.redirect("/mains")
// 		}
// 	})
	
// })




// app.get("/mains/new",isLoggedIn,function(req,res){
// 	res.render("mains/new.ejs",{currentUser:req.user})
// })



// app.get("/mains/:id",function(req,res){
// 	console.log("More info page visited")
// 	// Occasion.findById(req.params.id, function(err, foundEvent){
// 	// if(err){
// 	// console.log(err);
// 	// } else {
			
// 			//req.params.id
// 	Occasion.findById(req.params.id,function(err,foundCampground){
// 		if(err){
// 			console.log(err)
// 		}else{
			
			
// 			    var camp=foundCampground.name
// 				Occasion.find({"name":camp}, function(err,somecampgrounds){
// 				if(err){
// 					console.log(err);
// 				} else{
// 					res.render("mains/show",{campgrounds:somecampgrounds,category:camp,currentUser:req.user})
// 				}
// 			    })
			
			
// 	 	}
// 	 })
			
// 			// console.log(foundEvent)
// 			// //render show template with that campground
// 			// //res.render("show", {campgrounds: foundEvent});
// 			// }
// 			// });
	
// })

// //diff1================
// app.get("/moreinfo/:id",function(req,res){
// 	Occasion.findById(req.params.id).populate("comments").exec(function(err, foundImage){
// 	if(err){
// 	console.log(err);
// 	} else {
// 	res.render("mains/moreinfo.ejs",{foundImage:foundImage,currentUser:req.user})}
// })
// })


// app.get("/moreinfo/:id/comments/new",isLoggedIn,function(req,res){
// 	//res.send("hello sucka")
// 	//changed file locations for ejs
// 	Occasion.findById(req.params.id,function(err,campground){
// 		if(err){
// 			console.log(err)
// 		}else{
// 			res.render("comments/new",{campground:campground,currentUser:req.user})
// 		}
// 	})
	
// })

// app.post("/moreinfo/:id/comments",isLoggedIn,function(req,res){
// 	Occasion.findById(req.params.id, function(err, campground){
// 		if(err){
// 			console.log(err)
// 			redirect("/mains")
// 		}else{
// 			//console.log(req.bod.comment)
// 			Comment.create(req.body.comment, function(err, comment){
// 				if(err){
// 					console.log(err)
// 				}else{
// 					comment.author.id = req.user._id;
// 					comment.author.username = req.user.username;
// 					comment.save();
// 					campground.comments.push(comment);
// 					campground.save();
// 					res.redirect("/moreinfo/"+campground._id)
// 				}
// 			})
// 		}
// 	})
// })


// //Auth routes====================================================

// //------------------------------
// //sign up form
// app.get("/register",function(req,res){
// 	res.render("register",{currentUser:req.user})
// })

// //sign up post req
// app.post("/register", function(req,res){
// 	var newUser = new User({username: req.body.username});
// 	User.register(newUser, req.body.password, function(err,user){
// 		if(err){
// 			console.log(err);
// 			return res.render("register")
// 		}
// 		passport.authenticate("local")(req,res,function(){
// 			//res.send("OK")
// 			res.redirect("/login");
// 		})
// 	})
// })

// //log in form
// app.get("/login",function(req,res){
// 	res.render("login",{currentUser:req.user})
// })

// app.post("/login",passport.authenticate("local", {
// 	successRedirect: "/mains",
// 	failureRedirect: "/login"
// }),function(req,res){
	 
// })

// app.get("/logout", function(req,res){
// 	//res.send("Broooo")
// 	req.logout();
// 	res.redirect("/")
// })

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next()
	}    
	res.redirect("/login")
}



app.use("/",authRoutes);
app.use("/moreinfo/:id/comments",commentRoutes);
app.use("/mains",mainRoutes);
app.use("/moreinfo",moreinfoRoutes)
app.use("/",profileRoutes)
app.use("/",reviewRoutes)
app.use("/review/:rid/comments",comment2Routes)
app.use("/",archiveRoutes)
app.use("/archive/:rid/comments",comment3Routes)




app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});