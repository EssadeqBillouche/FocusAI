import mongoose from "mongoose";


const UserShema = mongoose.Schema({
    firstName : {type: String, required : true, minlength :3, trim: true},
    lastName : {type: String, required : true, trim: true},
    email : {type : String, required : true, unique: true, lowercase: true, trim: true},
    password :{type : String, required: true, select: false},
    role : {type : String, enum: ["user", "admin"], default : "user"}

}, { timestamps: true })

const User = mongoose.model("User", UserShema);

export default User;
