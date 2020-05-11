const jwt=require("jsonwebtoken")
const getUserId=(req)=>{
   const userData= JSON.parse(req.headers.authorization)
    return jwt.decode(userData)
}
    
module.exports=getUserId