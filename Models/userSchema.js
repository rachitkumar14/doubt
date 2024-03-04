const mongoose = require('mongoose');
const JWT = require('jsonwebtoken')
const userSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"name must be required"]
    },
    email:{
        type:String,
        trim:true,
        unique:[true,'Email must be unique'],
        required:[true,"email must be required"]
    },
    password:{
        type:String,
        required:[true,"password must be required"]
    },
    confirmPassword:{
        type:String,
        required:[true,"confirm Password must be required"]
    }
})
// userSchema.methods={
//     jwtToken()
//     {
//         return JWT.sign(
//             {id:this._id , email:this.email},
//             process.env.SECRET,
//             {expiresIn:'24h'}
//         )
//     }
// }
userSchema.methods={
    jwtToken()
    {
        return JWT.sign(
            {id:this._id , email:this.email},
            process.env.SECRET,
            {expiresIn:'24h'}
        )
    }
}

module.exports=mongoose.model("User",userSchema);