const isLogin = (req,res,next) => {
    const isLoggedin = req.userAuth;
    if(isLoggedin){
        next()
    }else{
        const err = new Error('You are not login.')
        next(err);
    }
}

module.exports = isLogin