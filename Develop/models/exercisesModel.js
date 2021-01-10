const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    type: {
        type:String
    },
    name: {
        type:String
    },
    duration: {
        type:Number
    },
    weight: {
        type:Number
    },
    reps: {
        type:Number
    },
    sets: {
        type:Number
    }
})


const Exercise = mongoose.model("Exercise", exerciseSchema);//The model naem is Workout -> is this also the table name?

module.exports = Exercise; //The database name is workout