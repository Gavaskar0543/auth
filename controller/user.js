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
      req.flash('error','Password & Conforim password mismatch');
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
        req.flash('success','User Created Successfully')
        return res.redirect('back');
      }
    } catch (error) {
      console.log('Error in creating user:', error);
      return res.redirect('back');
    }
  };
  module.exports.createSession = function(req, res) {
    req.flash('success','Logged in Successfully');
   return res.redirect('/');
    
  };
  
  module.exports.destroySession = function(req, res){
    req.logout(function(err) {
        if (err) {
          console.log('Error logging out:', err);
          return;
        }
        
        // Perform any necessary operations after logout
       req.flash('success','You Logged Out!');
        return res.redirect('/');
      });
}