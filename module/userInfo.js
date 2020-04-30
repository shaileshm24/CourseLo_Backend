import mongoose from 'mongoose';
import autoIncrement from 'mongoose-plugin-autoinc';

const collectionName  = 'userToken';
const userTokenSchema =mongoose.Schema({
    id:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String, required:true},
    password:{type:String,required:true},
    role:{type:String,required:true},
    manager:{type:String,required:true},
    skill:{type:String},
    managerId:{type:String},
    course:{
      title:{type:String},
      url:{type:String},
      image_480x270:{type:String}
    }
}, {collection : collectionName});


userTokenSchema.plugin(autoIncrement, {
    model : 'userToken',
    field : 'id',
    startAt : 100,
    incrementBy : 1
  });
  

export const userToken = mongoose.model(collectionName,userTokenSchema);