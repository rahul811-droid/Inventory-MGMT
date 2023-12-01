

import ProductModel from "../modells/product.model.js";
import UserModel from "../modells/user.model.js";

export default class UserController{
    getRegister(req,res,next){
        res.render('register')
    }
    getLogIn(req,res){
        res.render('login',{errorMessage:null})
    }
    postRegister(req,res){
        const { name, email, password } = req.body;
       console.log(req.body)
        UserModel.add(name, email, password );
        
        res.render('login',{errorMessage:null})
    }

    postLogIn(req,res){
        const {email,password} = req.body ;
        console.log(req.body)

        const user =UserModel.isValidUser(email,password);
        if(!user){
            return res.render('login',{
                errorMessage:'Invalid credentials'
            });
            
        }
        req.session.userEmail =email;
        var products = ProductModel.getAll();
             res.render('index', { products });
    }

    logout(req,res){
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/login')
            }
        });
        res.clearCookie('lastvisit');
    }
   
}