 
import mongoose from "mongoose";
const Schema = mongoose.Schema;
//todo importing passport local mongoose
import passportLocalMongoose from "passport-local-mongoose"; //passportLocalMongoose will autometically define a username and password with added salt and hashed password.
const userSchema = new Schema ({
  email: {
    type: String,
    required: true,
 },
})
userSchema.plugin(passportLocalMongoose);//it should be the above of const User = ... //now it will create a salting hashing in pasword and also store username
const User = mongoose.model("User", userSchema);
export default User;