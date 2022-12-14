const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllWorkouts = (filterParams) => {
    console.log(filterParams)
    try {
        let workouts = DB.workouts;
        
        if(filterParams.mode) {
            return workouts.filter((workout) => {
                return workout
                    .mode
                    .toUpperCase()
                    .includes(filterParams.mode.toUpperCase());
            });
        }

        if(filterParams.equipment) {
            return workouts.filter((workout) => {
                return workout
                    .equipment
                    .includes(filterParams.equipment);
            });
        }

        if(filterParams.random) {
            const randomWorkouts = Array(+filterParams.random).fill(0);
            const lenData = workouts.length;
            for (let i = 0; i < randomWorkouts.length; i++) {
                let randNumber = Math.floor(Math.random() * lenData);
                randomWorkouts[i] = workouts[randNumber];
            }
            return randomWorkouts;
        }

        return workouts;
    } catch (error) {
        throw { status: 500, message: error };
    }
};

const getOneWorkout = (workoutId) => {
    try {
        const workout = DB.workouts.find((workout) => workout.id === workoutId);
        if (!workout) {
            throw {
                status: 400,
                message: `Can't find workout with the id '${workoutId}'`,
            };
        }
        return workout;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const createNewWorkout = (newWorkout) => {
    try {
        const isAlreadyAdded =
            DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
        if (isAlreadyAdded) {
            throw {
                status: 400,
                message: `Workout with the name '${newWorkout.name}' already exists`,
            };
        }
        DB.workouts.push(newWorkout);
        saveToDatabase(DB);
        return newWorkout;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const updateOneWorkout = (workoutId, changes) => {
    try {
        const isAlreadyAdded =
            DB.workouts.findIndex((workout) => workout.name === changes.name) > -1;
        if (isAlreadyAdded) {
            throw {
                status: 400,
                message: `Workout with the name '${changes.name}' already exists`,
            };
        }
        const indexForUpdate = DB.workouts.findIndex(
            (workout) => workout.id === workoutId
        );
        if (indexForUpdate === -1) {
            throw {
                status: 400,
                message: `Can't find workout with the id '${workoutId}'`,
            };
        }
        const updatedWorkout = {
            ...DB.workouts[indexForUpdate],
            ...changes,
            updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        };
        DB.workouts[indexForUpdate] = updatedWorkout;
        saveToDatabase(DB);
        return updatedWorkout;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const deleteOneWorkout = (workoutId) => {
    try {
        const indexForDeletion = DB.workouts.findIndex(
            (workout) => workout.id === workoutId
        );
        if (indexForDeletion === -1) {
            throw {
                status: 400,
                message: `Can't find workout with the id '${workoutId}'`,
            };
        }
        DB.workouts.splice(indexForDeletion, 1);
        saveToDatabase(DB);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

module.exports = {
    getAllWorkouts,
    createNewWorkout,
    getOneWorkout,
    updateOneWorkout,
    deleteOneWorkout,
};
