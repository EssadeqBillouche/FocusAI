import mongoose from "mongoose";


const UserShema = mongoose.Schema({
    firstName : {type: String, require : true, minlenght :3},
    lastName : {type: String, require : true},
    email : {type : String, require : true},
    password :{type : String, require: true},
    role : {type : String, default : "User"}

})

const User = mongoose.model("User", UserShema);

export default User;
