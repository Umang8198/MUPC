var mongoose = require("mongoose")
var Occasion=require("./models/main")
var Comment =require("./models/comment")



var data = [
    {
        name: "Landscape", 
        image: "https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "Landscape photography is undoubtedly one of the most rewarding and enjoyable forms of photography. Who doesn’t want to get outside more, to breathe the fresh air, and to connect to nature? Whether your pastime is to capture majestic snow-capped mountain peaks, the orderly structure of a metropolis skyline, or calm waves lapping at a palm tree-lined island beach, these landscape photography tips will help you make the most of your next photo expedition."
    },
    {
        name: "Macro", 
        image: "https://images.pexels.com/photos/1118865/pexels-photo-1118865.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "Landscape photography is undoubtedly one of the most rewarding and enjoyable forms of photography. Who doesn’t want to get outside more, to breathe the fresh air, and to connect to nature? Whether your pastime is to capture majestic snow-capped mountain peaks, the orderly structure of a metropolis skyline, or calm waves lapping at a palm tree-lined island beach, these landscape photography tips will help you make the most of your next photo expedition"
    },
    {
        name: "Urban", 
        image: "https://images.pexels.com/photos/315191/pexels-photo-315191.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "Urban photography is a visual representation of urban spaces and everything that shapes their environment, from geometric and architectural structures to people and other living things. This varied discipline can merge with other genres, such as architectural, documentary, portrait, and fine art photography"
    }
]



function seedDB(){
	Occasion.remove({},function(err){
	if(err){
		console.log(err)
	}
	// console.log("removed campgrounds")
	// 	//add new camps
	// 	data.forEach(function(seed){
	// 		Occasion.create(seed,function(err,occasion){
	// 			if(err){
	// 				console.log(err)
	// 			}else {
	// 				console.log("added a campground")
				
	// 			//add comments
	// 			Comment.create(
	// 			{
	// 				text:"This place is great, but i wish there was internet",
	// 				author:"homer"
	// 			}, function(err, comment){
	// 				if(err){
	// 					console.log(err)
	// 				}else{
	// 					occasion.comments.push(comment);
	// 					occasion.save()
	// 					console.log("created new comment")
	// 				}
	// 			})
	// 			}
	// 		})
	// 	})
	})
	
}

module.exports=seedDB 