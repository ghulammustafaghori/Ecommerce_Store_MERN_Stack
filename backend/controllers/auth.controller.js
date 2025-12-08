const User=require("../models/user.model");
const jwt=require("jsonwebtoken");
const runRedis=require("../lib/redis");
const generateTokens= (userId)=>{
    const accessToken = jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:"15m"
    });
    const refreshToken=jwt.sign({userId},process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:"7d"
    });

    return {accessToken,refreshToken};
}

const storeRefreshToken = async(userId,refreshToken)=>{
    const redisClient=await runRedis();
    await redisClient.set(`refreshToken:${userId}`,refreshToken,"EX",7*24*60*60);
}

const setCookies=(res,accessToken,refreshToken)=>{
    res.cookie("accessToken",accessToken,{
        httpOnly:true, //prevent XSS attacks, cross site scripting attack
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict", // prevents CSFR attack, cross-site request forgery attack,
        maxAge:15*60*1000 //15 minutes
    })
     res.cookie("refreshToken",refreshToken,{
        httpOnly:true, //prevent XSS attacks, cross site scripting attack
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict", // prevents CSFR attack, cross-site request forgery attack,
        maxAge:7*24*60*60*1000 //7 days
    })
}


const signup = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Create new user
        const user = await User.create({
            name,
            email,
            password
        });

        //authenticate
        const {accessToken,refreshToken}=generateTokens(user._id)
        await storeRefreshToken(user._id,refreshToken);

        setCookies(res,accessToken,refreshToken);

        res.status(201).json({user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        },
            message: "User created successfully",
            
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const login=async (req,res)=>{
    res.send("Log in route called");
}
const logout=async (req,res)=>{
    res.send("Log out route called");
}
module.exports={signup,login,logout};