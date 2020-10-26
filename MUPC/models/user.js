var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose")


var UserSchema =new mongoose.Schema({
	username: String,
	userimage: String,
	password: String,
	firstName: String,
	lastName: String,
	email: String,
	isAdmin: {type: Boolean, default: false}
});

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User",UserSchema)