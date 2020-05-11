const jwt=require("jsonwebtoken")
const getUserId=(req)=>{
   const userData= JSON.parse(req.headers.authorization)
    return jwt.decode(userData.token)}
    // return jwt.decode(req.headers.authorization)}
module.exports=getUserId