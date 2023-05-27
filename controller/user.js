const User = require('../models/user');

module.exports.signup = function(req,res){
    console.log(req.body);
    return res.render('signup',{
        title : 'signup'
    })
}
module.exports.signin = function(req,res){
    return res.render('signin',{
        title : 'sigin'
    })
}
module.exports.create =  function(req,res){
    if(req.body.password != req.body.conforimPassword){
        console.log('Password doesnt match!');
       

        return  res.redirect('back');;
    }
    User.findOne({email : req.email},function(err,user){
        if(err){
            console.log(err,"error in creating user line21");
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating new user',err);
                    return;
                }
                console.log(user);
                res.redirect('/user/signin');
            })
       
        }else{
            return res.redirect('back');
        }
    })

}
module.exports.createSession = function(req,res){
    User.findOne({email : req.body.email},function(err,user){
        if(err){
           console.log('error in signin',err)
        }
        if(!user || user.password != req.body.password){
            console.log('password/username wrong!')
            return res.redirect('back');
        }
        console.log('user found',user);
        return res.render('profile',{
            user : user,
        })
    })
} 

module.exports.reset = function(req,res){
    return res.render('resetPassword',{
        title : 'reset passowrd'
    })
}