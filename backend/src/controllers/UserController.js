const knex = require('../database/connection');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookie = require('cookie');
const env = require('../config/process')

//let secret = "hagsdjksdhfkjadsbafjhsdkfldghasd"

class UserController {

    async index(req, res) {

		try{
	        var users = await User.findAll();

	        return res.json({success:true ,users});
       } catch(e){
        	  return res.json({success:false,users}).status(500)
        }
    }

    async findById(req, res) {

        try {

            let id = req.params.id;
            let user = await User.findById(id);

            if (user.length != 0) {
                return res.json({success:true,user});
            } else {
                return res.json({success:false,message:'Usuário não encontrado'}).status(404)
           }
            
        } catch(err) {
        	 return res.json({success:true}).status(500)
        }
    }

    async create(req, res) {
        
        try {
            let {username, password, role} = req.body;
            let user = await User.findByName(username);
            if (user){
                return res.json({success:false,message:'este nome de usuário já existe!'}).status(400)
            }
            if(!username || !password){
            	return res.json({success:false,message:'preencha todos os campos!'}).status(400)
            }
            let result = await User.new(username, password, role);
            if (result){
                return res.json({success:true,message:'Usuário criado!'});
            } else {    
                return res.json({success:false,message:'Algo deu errado!'});
            }
            

        } catch(err) {

           return res.json({success:false}).status(500)

        }
    }

    async edit(req, res) {

        let {id, username} = req.body;
        
	    try{
        	var result = await User.update(id, username)
            
	    }catch(e){
	    	return res.json({success:false, message: result.error}).status(500)
	    }

        if (result != undefined) {
            if (result.status == true) {
                return res.json({success:true, message:'Usuário editado!'}); 
            } else {
                return res.json({success:false, message: result.error}).status(406);
            }
        } else {
            return res.json({success:false, message: result.error}).res.status(406)
        }
    }


    async remove(req, res) {

        let {id} = req.body
        try{
        	
    	  var result = await User.delete(id)
    	  
        }catch(e){
        	
        	return res.json({success:false, message: result.error}).status(500)
        }
        
        if(result.status == true) {
        	
            return res.json({success:true,message:'Usuário deletado'})
            
        } else {
            return res.json({success:false, message: result.error}).res.status(406);
        }
    }


  	async login (req, res){
        let {username, password} = req.body;

        try {
            let result = await User.findByName(username);
            let user = result.user[0];
            
            if (result.success == true){
                
                let result = await bcrypt.compare(password, user.password);

		 		if(result){

		 			try { 

		 			    let token = await jwt.sign({id: user.id, username: user.username, role: user.role},env.Secret,{expiresIn: "5h"})

		 				res.setHeader('Set-Cookie',[cookie.serialize('Access-Token', token, {
                    	   httpOnly: true,
                    	   maxAge: 60 * 59 * 3
		 				})]);
		 				res.setHeader('Access-Control-Allow-Headers', '*');
		 				res.setHeader('Access-Control-Allow-Credentials', true);
                        res.json({success: true, username: user.username, userId: user.id})
				 		res.end()
				 		return
				 		
		 			}catch(error){
		 				return res.status(500).json({success:false, error:{}})
		 			}
		 		}else{
		 			return res.json({success:false, message: 'Usuário ou senha inválidos'})
		 		}
		 	}else{
		 		return res.json({success:false ,message: 'Usuário ou senha inválidos'});
		 	}
		 } catch (e) {
			return res.json({success:false, message: 'Usuário ou senha inválidos'})
		 }
	 }
}

module.exports = new UserController();