var mongoose = require("mongoose");
var reviewpageSchema =new mongoose.Schema({
	title: String,
	date:String,
	image: String,
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

const Comment = require('./comment');
reviewpageSchema.pre('remove', async function() {
	await Comment.remove({
		_id: {
			$in: this.comments
		}
	});
});

module.exports=mongoose.model("ReviewPage", reviewpageSchema)