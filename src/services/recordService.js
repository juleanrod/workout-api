const Record = require("../database/Record");

const getRecordForWorkout = (workoutId) => {
    try {
        const record = Record.getRecordForWorkout(workoutId);
        return record;
    } catch (error) {
        throw error;
    }
};

const getAllRecords = () => {
    try {
        const records = Record.getAllRecords();
        return records;
    } catch (error) {
        throw error;
    }
}

const getRecord = (recordId) => {
    try {
        const record = Record.getRecord(recordId);
        return record;
    } catch (error) {
        throw error;
    }
}



module.exports = { 
    getRecordForWorkout,
    getAllRecords,
    getRecord,
};
