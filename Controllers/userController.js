const user = require("../Models/userSchema");
const emailValidator = require("email-validator");
const signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const emailValidate = emailValidator.validate(email);
  if (!name || !email || !password || !confirmPassword) {
    return res.status(500).json({
      success: false,
      message: "All things are required",
    });
  }

  if (!emailValidate) {
    return res.status(500).json({
      success: false,
      message: "Please write appropriate email",
    });
  }
  if (password !== confirmPassword) {
    return res.status(500).json({
      success: false,
      message: "please write password and confirm password same",
    });
  }
  try {
    const userInfo = user(req.body);
    const result = await userInfo.save();

    return res.status(200).json({
      success: true,
      message: "User signup successfully",
      data: { result },
    });
  } catch (e) {
    if (e.code === 11000) {
      return res.status(500).json({
        success: false,
        message: "Account already exists",
      });
    }
    return res.status(500).json({
      success: false,
      message: e,
    });
  }
};

// Sign in code :-
const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!password || !email) {
      return res.status(500).json({
        success: false,
        message: "All things are required",
      });
    }

    const userData = await user.findOne({ email }).select("+password");

    if (!userData || userData.password !== password) {
      return res.status(500).json({
        success: false,
        message: "Invalid Credential",
      });
      }// else {
    //   return res.status(200).json({
    //     success: true,
    //     message: "Login successfully",
    //   });
    // }
    const token = userData.jwtToken();
    userData.password=undefined;
    userData.confirmPassword=undefined;
    const cookieOption = 
    {
        maxAge:24*60*60*1000,
        httpOnly:true
    }
    res.cookie("token",token,cookieOption);
    res.status(200).json({
        success:true,
        message:"Login Successfully",
        data:userData
    })
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message
    })
  }
};
   // Get user 

const getUser = async(req,res)=>{
  const userId = req.user.id;
  try{
    const userData = await user.findById(userId);
   return  res.status(200).json({
        status:true,
        message:e.message,
        data:userData
    })
  }
  catch(e)
  {
    return res.status(500).json({
        status:false,
        message:e.message
    })
  }
  
}   
module.exports = {
  signup,
  signin,
  getUser
};
