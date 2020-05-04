import jwt from 'jsonwebtoken';
import {userToken} from '../module/userInfo';
import  bcrypt  from "bcrypt";
import axios from 'axios';
import config from '../config/config';


export const signup = async (req,res) =>{
	try{
		const data = req.body;
		//console.log(data.user);
		const salt = 10;
		let userInfo = {}
		const profile =await userToken.find({"email":data.user.email});
		//console.log(profile.length);
		if(profile.length == 0){
			const updateManagerID = await userToken.findOne({name:data.user.manager});
			//console.log(updateManagerID);
			try{
				if(updateManagerID){
					bcrypt.hash(data.user.password, salt, async function(err, hash) {
			
						if(!err){
					data.user["password"] = hash;
					data.user.managerId = updateManagerID.id;
					userInfo = await userToken.create(data.user);
					//console.log(userInfo);	
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
			let token,flag = false;
			const userData = await userToken.find({"email":data.user.email});
			if(data.user.email == userData[0].email){
			const hash = userData[0].password;
			await bcrypt.compare(data.user.password, hash, async function(error, isMatch) {
				try {				
					if(isMatch){	
					token = jwt.sign({data}, 'secret',{expiresIn:'1h'});
					const getAllData = await userToken.find();
					//console.log(getAllData);
					getAllData.forEach(function (item) {
						//console.log(item.managerId == userData[0].id);
						if(userData[0].id === item.managerId){
							flag = true
							return flag;
						}
						
					  });
					 
					
				}
			else{
				throw error;
			}
			return res.status(200).json({token,flag});
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
	catch(error){
		return res.status(500).send("Error");
	}	
};


export const getUser  = async(req, res) => {
	try{
		const data = req.headers.authorization.split(' ')[1];
		//console.log(data);
		const options = {
			expiresIn: '1h',
			};
		
		const result = jwt.verify(data,'secret', options);
		console.log(result.data.user.email);		
    	if (result!=null){
		
		const getuserData = await userToken.findOne({"email":result.data.user.email});
		console.log(getuserData);
		//const getAllData = await userToken.find();
		//console.log(getAllData)
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


export const getEmployees = async(req,res) =>{
	try{
		const data = req.headers.authorization.split(' ')[1];
		console.log(data);
		const options = {
			expiresIn: '1h',
			};
		const result = jwt.verify(data,'secret', options);
		console.log(result.data.user.email);

		let getuserData = await userToken.findOne({"email":result.data.user.email});
		console.log(getuserData);

		let getAllData;
				
    	if (result!=null){
			 getAllData = await userToken.find({"managerId":getuserData.id});
			 console.log(typeof getAllData);
 			//  getAllData.forEach(async item => {
			// 	 console.log(item.managerId); 
			// 	if(item.managerId === getuserData.id){
			// 		allUser = await userToken.find({"managerId":getuserData.id});
			// 		console.log(allUser); 
			// 	}              
		//});
		}
		else{
			throw error;
		}
		return res.status(200).send(getAllData);
		}
		catch(error){
			console.log(error)
		}
};


export const getCourse = async (req,res) =>{
	try{

		const data = req.body
		console.log(data);
		const userSkill = await userToken.findOne({"email":data.userEmail.email});
		console.log(userSkill.skill);
		var courses = await axios.get(config.udemyCourseAPI+`${userSkill.skill}`,{'headers':{
            "Accept": "application/json, text/plain, */*",
            "Authorization": config.authorization,
            "Content-Type": "application/json;charset=utf-8"
		}});
	
	    
        var temp = JSON.stringify(courses.data.results);
		temp = JSON.parse(temp);
		
        
        const courseTitle = temp.map(item => {
          let detailOfCoarse= {}
          detailOfCoarse['title']=item.title
          detailOfCoarse['url'] = item.url
          detailOfCoarse['image_480x270']= item.image_480x270
          return detailOfCoarse;
		});
		let courseData = []; 
		for (var i=0; i<=5; i++){
			courseData[i] = courseTitle[i]
		}
		console.log(courseData);
		return res.status(200).send(courseData);
	}
	catch(error){
		return res.status(500).send(error);
	}
};

export const assignCourse = async (req,res) =>{
	try{
		const data = req.body;
		console.log(data);
		const courseUpdate = await userToken.findOneAndUpdate({"email":data.emailId.email},data);
		console.log(courseUpdate);
		return res.status(200).send(courseUpdate)
	}
	catch(error){
		return res.status(500).send(error);
	}
};


