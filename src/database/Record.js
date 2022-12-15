const DB = require("./db.json");

const getAllRecords = () => {
    try {
        const records = DB.records;
        if(!records) {
            throw {
                status: 400,
                message: `Can't find any records!`
            };
        }
        return records;
    } catch (error) {
        throw { 
            status: error?.status || 500, 
            message: error?.message || error, 
        };
    }
}

const getRecordForWorkout = (workoutId) => {
    try {
        const record = DB.records.filter((record) => record.workout === workoutId);
        if (!record) {
            throw {
                status: 400,
                message: `Can't find workout with the id '${workoutId}'`,
            };
        }
        return record;
    } catch (error) {
        throw { 
            status: error?.status || 500,
            message: error?.message || error,
        };
    }
};

const getRecord = (recordId) => {
    try {
        const record = DB.records.filter(record => record.id === recordId);
        if(!record) {
            throw {
                status: 400,
                message: `Can't find record with the id '${recordId}'`,
            }
        }
        return record;
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error,
        }
    }
}

const createNewRecord = (newRecord) => {
    try {
        const isAlreadyAdded =
            DB.records.findIndex((record) => record.name === newRecord.name) > -1;
        if (isAlreadyAdded) {
            throw {
                status: 400,
                message: `Workout with the name '${newWorkout.name}' already exists`,
            };
        }
        DB.records.push(newRecord);
        saveToDatabase(DB);
        return newRecord;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
}

const updateRecord = (recordId, record) => {
    try {
        //TODO: check that is updating correctly 12/14/2022
        const recordToUpdate = DB.record.findIndex((oldRecord) => oldRecord.id === record.id) > -1;
        if (recordToUpdate) {
            throw {
                status: 400,
                message: `Workout with the name '${record.i}' already exists`,
            };
        }
        DB.workouts.push(n);
        saveToDatabase(DB);
        return newWorkout;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
}


module.exports = { 
    getAllRecords,
    getRecordForWorkout,
    getRecord,
    createNewRecord,
    updateRecord,
};
