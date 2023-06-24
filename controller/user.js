const User = require('../models/UserModel');
//home
module.exports.home =  function(req,res){
  
  return res.render('signIn',{
        pageName:'HOME',
        
        
    });
}

module.exports.newhomie = function(req,res){
    return res.render('signup',{
        pageName:'HOME'
    });
}



module.exports.createNewUser = async function(req, res) {
    if (req.body.password != req.body.Cpassword) {
      console.log('Password and confirm password do not match');
      return res.redirect('back');
    }
  
    try {
      const checkAlreadyUser = await User.findOne({ email: req.body.email });
      if (!checkAlreadyUser) {
      const newUser =  await User.create(req.body);
        console.log('User created successfully!',newUser);
        return res.redirect('/');
      } else {
        console.log('Error in creating user');
        return res.redirect('back');
      }
    } catch (error) {
      console.log('Error in creating user:', error);
      return res.redirect('back');
    }
  };
  module.exports.createSession = function(req, res) {
   return res.redirect('/');
  };
  
  