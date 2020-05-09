
const jwt=require("jsonwebtoken")
 const  jwtVerify=(req,res,next)=>{
	const token=req.headers.authorization;
	console.log(token)
	jwt.verify(token,"secret_key",(err,user)=>{
		if(err){
			return res.sendStatus(403)
		}
		next()
	})
	
}
module.exports={jwtVerify}