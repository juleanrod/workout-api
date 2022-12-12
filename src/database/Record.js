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

module.exports = { 
    getAllRecords,
    getRecordForWorkout,
    getRecord,
};
