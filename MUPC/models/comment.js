var mongoose = require("mongoose");
 
var commentSchema = new mongoose.Schema({
    text: String,
	//eventually will be assoicated with user model
 author:
	{
	id: {
	type:mongoose.Schema.Types.ObjectId,
	ref: "User"
	
},
	username:String
}
});
 
module.exports = mongoose.model("Comment", commentSchema);