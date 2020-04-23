import jwt from 'jsonwebtoken';
import {userToken} from '../module/userInfo';
import  bcrypt  from "bcrypt";

export const signup = async (req,res) =>{
	try{
		const data = req.body;
		//console.log(data.user);
		const salt = 10;
		let userInfo = {}
		const profile =await userToken.find({"email":data.user.email});
		console.log(profile.length);
		if(profile.length == 0){
			const updateManagerID = await userToken.findOne({name:data.user.manager});
			console.log(updateManagerID);
			try{
				if(updateManagerID){
					bcrypt.hash(data.user.password, salt, async function(err, hash) {
			
						if(!err){
					data.user["password"] = hash;
					data.user.managerId = updateManagerID.id;
					userInfo = await userToken.create(data.user);
					console.log(userInfo);	
					}});
				}
			
				else{
					throw error;
				}
				return res.status(200).send("Success");
			}
			catch(error){
				return res.status(500).send(error);
			}
		}
	}        
	catch(error){
		return res.status(500).send(error)
	}
};


export const login = async (req,res) =>{
    try{
    		const data = req.body;
			console.log(data.user.email);
			let token 
			const userData = await userToken.find({"email":data.user.email});
			if(data.user.email == userData[0].email){
			const hash = userData[0].password;
			await bcrypt.compare(data.user.password, hash, function(error, isMatch) {
				try {				
					if(isMatch){	
					token = jwt.sign({data}, 'secret',{expiresIn:'1h'});
				}
			else{
				throw error;
			}
			return res.status(200).json(token);
		}
		catch(error) {
			return res.status(500).send(error);
		}		
	  });
	}
	else{
		return res.status(500).send(error);
		}
	}
	catch(error) {
		return res.status(500).send("Error");
	}	
};


export const getUser  = async(req, res) => {
	try{
		const data = req.headers.authorization.split(' ')[1];
		console.log(data);
		const options = {
			expiresIn: '1h',
			};
		
		const result = jwt.verify(data,'secret', options);
		console.log(result.data.user.email);		
    	 if (result!=null){
		
		const getuserData = await userToken.findOne({"email":result.data.user.email});
		console.log(getuserData);
		const getAllData = await userToken.find();
		console.log(getAllData)
		// if(getAllData.managerId == getuserData.id){
		// const allUser = await userToken.find({"managerId":getData.id});
		// console.log(allUser);}
		//console.log(getData);
		return res.status(200).send(getuserData);
		}
	
	}
	catch(err){
		return res.status(500).send("Invalid Token");
	}	
	
};


