const User = require('../models/UserModel');
const reset = require('../mailer/loginMails');
let manId;
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
  //signout
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

//reset 

module.exports.reset = function(req,res){

  res.render('reset',{
    page:'Reset Password'
  })
}
 // Assuming the 'reset' module is in the same directory



 module.exports.resetMyPassword = async function(req, res) {
   try {
     const user = await User.findOne({ email: req.body.email });
     if (!user) {
       req.flash('error', 'Email id not found');
       return res.redirect('back');
     }
     
     req.flash('success', 'Check your Inbox');
     await reset.resetPassword(user); // Assuming resetPassword is an asynchronous function
     return res.redirect('/');
   } catch (error) {
     console.log(error);
   }
 };


 module.exports.showResetPage = function(req,res){
  const id = req.query.id
  manId = id;
  return res.render('passwordUpdate',{
    page:'passwordupdate'
  })
 }
 module.exports.setpassword = async function(req,res){
  
  if(req.body.newPassword != req.body.confirmPassword){
    console.log('password mismatch');
    req.flash('error','password mismatch');
    return res.redirect('back');
  }

  try{
  const user = await User.findByIdAndUpdate(manId, { password: req.body.newPassword }, { new: true });
  req.flash('success','password update successfull');
  return res.redirect('/');
  }
  catch(error){
    console.log(error);
  }
 }