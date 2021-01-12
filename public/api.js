const API = {
  async getLastWorkout() {
    let res;
    try {
      res = await fetch("/api/workouts");
      console.log("This is the response from making a get request to the endpoint /api/workouts:",res)

    } catch (err) {
      console.log(err)
    }
    const json = await res.json();
    console.log("This is the res.json I get after the hitting the /api/workouts endpoint",json);
    console.log("This is the length of json (json.length):", json.length);

    let lastWorkoutD = json[json.length - 1];
    lastWorkoutD.totalDuration = 0
    lastWorkoutD.exercises.forEach(exercise=>{lastWorkoutD.totalDuration+=exercise.duration})

    return lastWorkoutD
    //return json[json.length - 1];
    //access the exercises key and loop through array. for each value in the array access the objects duration property.
  },
  async addExercise(data) {
    const id = location.search.split("=")[1];

    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    return json;
  },
  async createWorkout(data = {}) {
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();

    return json;
  },

  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();

    return json;
  },
};
