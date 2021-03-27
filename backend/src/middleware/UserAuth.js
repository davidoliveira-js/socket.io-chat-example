const jwt =  require('jsonwebtoken')
const env = require('../config/process')
const cookie = require('cookie')
const UserData = require('../models/User')


module.exports ={
     
	async UserAuth (req,res,next){
		
         let cks =  req.headers
         var cookies =  await cookie.parse(cks)
         let session = cookies['sessionru']
         let Token = cookies['Access-Token']

         if(Token){
            try{
           	const info = await jwt.verify(Token,env.secretKey)
              if(session){
                  try{
                  let verify = await UserData.findByName(info.name)
                  if(verify.session == session){
                  	
 					res.setHeader('Set-Cookie',[cookie.serialize('sessionru',session,{
	            			httpOnly: true, 
	            			maxAge: 60*60*3 
            		}),cookie.serialize('Access-Token',Token,{  
            				httpOnly: true, 
            				maxAge: 60*60*3
            		})])  
                     next()
                     return
                      
                  }else{
            		res.setHeader('Set-Cookie',[cookie.serialize('sessionru',session,{
	            			httpOnly: true, 
	            			maxAge: 0   
            			}),cookie.serialize('Access-Token',Token,{  
            				httpOnly: true, 
            				maxAge: 0 
            				
            			})])  
            			await UserData.logout(info.username)
            			
                    return res.status(302).json({success:false})

                  }
   
                  }catch(e){
		            res.setHeader('Set-Cookie',[cookie.serialize('sessionru',session,{
			            		httpOnly: true, 
			            		maxAge: 0 
		            		}),cookie.serialize('Access-Token',Token,{  
			            		httpOnly: true,
			            		maxAge: 0 
		           	})])      
		           	  		await UserData.logout(info.username)
                    return res.status(302).json({success:false})

                  }
                 }else{
                    res.setHeader('Set-Cookie',cookie.serialize('sessionru',session,{ 
                            httpOnly: true, 
                            maxAge: 0   
                        }),cookie.serialize('Access-Token',Token,{
                        	httpOnly: true, 
                        	maxAge: 0      
                            
                        }))  
                       	await UserData.logout(info.username)
                    return res.status(302).json({success:false})

                 }
             
            }catch (e){
	           res.setHeader('Set-Cookie',[cookie.serialize('sessionru',session,{
	                    httpOnly: true,
	                    maxAge: 0     
	        	   }),cookie.serialize('Access-Token',Token,{  
			           	httpOnly: true,       
			           	maxAge: 0
	        	})])       
                return res.status(302).json({success:false})

            }
            
         }else{
	       res.setHeader('Set-Cookie',[cookie.serialize('sessionru',session,{  
	       		  httpOnly: true, 
	    		  maxAge: 0
	    	  }),cookie.serialize('Access-Token',Token,{
	    	  		httpOnly: true,
	    	  		maxAge: 0 
	    	  	
	    	  })])       
            return res.status(302).json({success:false})
         }

         
		}
	}
