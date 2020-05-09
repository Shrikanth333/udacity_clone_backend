const jwt=require("jsonwebtoken")
const user=jwt.decode(req.headers.authorization)

module.exports=user