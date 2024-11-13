const mongoose=require('mongoose');
const FeedbackSchema=new mongoose.Schema({
    originCity : {type : String,required :true},
    destinationCity : {type : String,required :true},
     price : {type : Number,required :true,min :0},
     priceDirection : {type : String,required :true,enum:['High','Low']},
     truckType : {type : String,required :true,enum:['Trailer','Container','Open']},
     weight : {type : Number,required :true,min :0},

     

});

module.exports=mongoose.model('Feedback',FeedbackSchema);