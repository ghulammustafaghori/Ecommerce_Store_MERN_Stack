const signup=async (req,res)=>{
    res.send("Sign up route called");
}
const login=async (req,res)=>{
    res.send("Log in route called");
}
const logout=async (req,res)=>{
    res.send("Log out route called");
}
module.exports={signup,login,logout};