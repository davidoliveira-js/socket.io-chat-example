const jwt =  require('jsonwebtoken')
const env = require('../config/process')
const cookie = require('cookie')

module.exports ={
	
	async AdminAuth (req, res, next){

	   let cks = req.headers

	   try{
		   
			let cookies = cookie.parse(cks.cookie);
			
			var token = cookies['Access-Token'];
			var session = cookies.sessionRu;
	   
	   }catch(e){ 
		   return res.status(401).json({success:false})
		}

		if(token){

			try {
				
				const InfoUser = await jwt.verify(token, env.Secret);

				if(InfoUser.role == 1 && InfoUser.session == session){
					next()
				}else{
					return res.status(401).json({success:false,message: 'usuário não autorizado'})
				}
			} catch (e) {
				return res.status(400).json({success:false,message: 'falha na autenticação'})
				
			}
			
		}else{
				return res.status(400).json({success:false,message: 'token inválido'})
		}
	}
}