const express=require('express');
const router=express.Router();
const Feedback=require('../models/Feedback');

//Validation middleware
const validateFeedback=(req,res,next)=>{
    const {originCity,destinationCity,price,priceDirection,truckType,weight}=req.body;
    if(!originCity || typeof originCity !=='string') return res.status(400).json({error: 'Invalid Origin City'});
    if(!destinationCity || typeof destinationCity !=='string') return res.status(400).json({error: 'Invalid Destination City'});
    if( typeof price !=='number' || price<=0) return res.status(400).json({error: 'Price must be a positive number'});
    if(!['High','Low'].includes(priceDirection)) return res.status(400).json({error: 'Price Direction must be High or Low'});
    if(!['Trailer','Container','Open'].includes(truckType)) return res.status(400).json({error: 'Invalid Truck Type'});
    if( typeof weight !=='number' || weight<=0) return res.status(400).json({error: 'Weight must be a positive number'});

    next();
};
 // POST /api/feedback/submit
router.post('/submit', validateFeedback, async (req, res) => {
    try {
      const feedback = new Feedback(req.body);
      await feedback.save();
      res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
      console.error('Error submitting feedback:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // GET /api/feedback/view
  router.get('/view', async (req, res) => {
    try {
      const feedback = await Feedback.find();
      res.status(200).json(feedback);
    } catch (error) {
      console.error('Error retrieving feedback:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  module.exports=router;
  

