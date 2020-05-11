
const jwt=require("jsonwebtoken")
 const  jwtVerify=(req,res,next)=>{
//    console.log(typeof JSON.parse(req.headers.authorization))
	const user=JSON.parse(req.headers.authorization);
	// user.token
	jwt.verify(user.token,"secret_key",(err,user)=>{
		if(err){
			return res.sendStatus(403)
		}
		next()
	})
	
}
module.exports={jwtVerify}