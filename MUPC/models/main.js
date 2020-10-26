var mongoose = require("mongoose");
var occasionSchema =new mongoose.Schema({
	name: String,
	image:String,
	description: String,
	author:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
			
		},
		username:String
	},
	comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
})

//pre hook 
const Comment = require('./comment');
occasionSchema.pre('remove', async function() {
	await Comment.remove({
		_id: {
			$in: this.comments
		}
	});
});

module.exports=mongoose.model("Occasion", occasionSchema)
