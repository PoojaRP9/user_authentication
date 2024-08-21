const {Schema,model} = require("mongoose")

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

// middleware to hash the user password
// userSchema.pre("save",async function(next){
//     try {
//         if (this.isModified("password")) {
//             // Hash the password asynchronously using bcrypt
//             this.password = await bcrypt.hash(this.password, 10);
//         }
//         next();
//     } catch (error) {
//         next(error);
//     }
// })


const User = model('user',userSchema);


module.exports = User;