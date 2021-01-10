var express = require("express");
let mongoose = require("mongoose");
var path = require("path");

var router = express.Router();


//import the models(mongoose schemas)
const db = require("../models");

//import seed.js file to populate the workout database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

//route that querys for all the workouts in the workouts table(collection)
router.get("/api/workouts", function(req, res) {

    
    console.log("The endpoint /api/workouts has been hit")
    


    db.Workout.find({}).populate("exercises").then((data1)=>{


        /*
        db.Workout.aggregate( [
            {
              $addFields: {
                totalDuration: {$sum: "$duration" } 
                
              }
            }
         ] ).then(data=>{
             console.log("The value returned from the aggregate method of the workout model: ",data)
             res.json(data)
             
         }).catch(err=>{
             console.log("The err returned from the aggregate method of the workout model: ",err)
         });*/



         
            
                 console.log("This is the data that comes back after the find query to the workouts collection to populate exercises:",data1)
                 res.json(data1)
             
         



    }



        

    ).catch(err=>{
        res.json(err)
        console.log("There has been an error tring to populate the exercises field in the workouts collection: ",err)
    });

    
    db.Workout.aggregate( [
        {
          $addFields: {
            totalDuration: {$sum: "$exercises" } 
            
          }
        }
     ] ).then(data=>{
         console.log("The value returned from the aggregate method of the workout model: ",data)
         
     }).catch(err=>{
         console.log("The err returned from the aggregate method of the workout model: ", err)
     });
    

});





router.post("/api/workouts", function(req, res) {
    console.log("This is the data that comes in from req.body for the post route when you go to the exercises page: ",req.body)
    db.Workout.create(req.body).then((data)=>{res.json(data)}).catch(err=>{res.json(err)})

    
});







router.put("/api/workouts/:id", function(req, res) {
    console.log("This is the value of req.body in the put route:",req.body)
    console.log("This is the value of the req.params.id (current workout id) in the put route: ",req.params.id)

    db.Exercise.create(req.body).then(({_id})=>{db.Workout.findByIdAndUpdate(req.params.id,{$push:{exercises:_id}},{new:true}).then(data=>{

        res.json(data)}).catch(err=>{console.log("This was there error that was sent back from MongoDB after the create method ran:", err)})
    
    });

    /*
    db.Workout.find({}).populate("exercises").then(

        (data2)=>{
           
                console.log("This is the data that comes back after the put query to the Exercise collection to populate exercises:",data2)
                res.json(data2)
            
        }

    ).catch(err=>{
        res.json(err)
        console.log("There has been an error tring to populate the exercises field in the workouts collection: ",err)
    })*/



})


router.get("/exercise", function(req, res) {

    console.log("This is __dirname: ",__dirname)
    res.sendFile(path.join(__dirname, "../public/exercise.html"));

        /*
        db.Workout.put({_id: mongojs.ObjectId(req.params.id)},{$set: req.body}).then(
    
            (data)=>{
               
                    //console.log("This is the data that comes back after the find query:",data)
                    res.json(data)
                
            }
    
        ).catch(err=>{
            res.json(err)
        })*/
        
    
});


 

    

    



module.exports = router

