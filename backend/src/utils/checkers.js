const axios = require("axios");
const UserAgent = require("user-agents");


async function Agent(){
	
		const userAgent = await new UserAgent ({ deviceCategory : 'mobile'}) ;    
		return userAgent.toString()
}

async function RequesT(metodo, url1, headers1, post = false, cookies = false){
	
		if (metodo == "post") {
		
				return await axios({
					method: "post",
					url: url1,
					headers: headers1,
					cookies:cookies,
					data: post,
					validateStatus: async function (status) {
   					return status > 200;}
			}).then(async (res) =>{
					return res

			}).catch(err=>{
				console.log(err)
			})
		}else{
				return  await axios({
					method: "get",
					url: url1,
					headers: headers1,
					cookies:cookies,
					data: post,
					validateStatus: async function (status) {
   					return status > 200;}
			}).then(async (res)=>{
				return res
			}).catch( err =>{
				console.log(err)
			})
		}
}

function msleep(n) {
	
	Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
  
}

function sleep(n) {
	
	msleep(n*1000);
  
}

function getStr(str,start,end){
	let str2 = str.split(start)
	str2 = str2[1]
	str2 = str2.split(end)
	return str2[0]
}
module.exports = {
	sleep:sleep,
	useragent:Agent,
	req: RequesT,
	getstr:getStr
}