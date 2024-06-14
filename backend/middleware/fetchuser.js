var jwt = require('jsonwebtoken');

const fetchuser=(req,res,next)=>{
    //get the user from jwt token and add id to request object
    const token=req.header('auth-token');
    if(!token){
        return res.status(401).send("Please authenticate using valid token");
    }
    try{
        const data=jwt.verify(token,process.env.JWT_SECRET)
        req.user=data.user;
        next();
    }catch(e){
        console.log(e);
        return res.status(401).send("Please authenticate using valid token");
    }
}
module.exports=fetchuser