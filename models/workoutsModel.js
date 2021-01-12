
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now //make this the date that the workout was preformed
    },

    exercises: [
        {
            type: Schema.Types.ObjectId,
            ref: "Exercise"
        }
    ]
        

})

const Workout = mongoose.model("Workout", workoutSchema);//The model name is Workout -> is this also the table name?

module.exports = Workout; //The database name is workout