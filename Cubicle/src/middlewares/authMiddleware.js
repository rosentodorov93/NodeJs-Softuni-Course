const jwt = require('../lib/jwt');
const {SECRET} = require('../constants');

exports.authUser = async(req, res, next) =>{
    const token = req.cookies["token"];
    if(token){
        try{
            const decodedToken = await jwt.verify(token, SECRET);
            req.user = decodedToken;
            res.locals.user = decodedToken;
            res.locals.isAuthenticated = true;
            next();
        }catch(error){
            console.log({error});
            res.clearCookie("token");
            res.redirect('/users/login');
        }        
    }else{
        next();
    }

}