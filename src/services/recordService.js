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

const createNewRecord = (newRecord) => {
    try {
        const record = Record.createNewRecord();
        return record;
    } catch (error) {
        throw error;
    }
}

const updateRecord = (recordId, record) => {
    try {
        const updatedRecord = Record.updateRecord(recordId, record);
        return updatedRecord;
    } catch (error) {
        throw error;
    }
}

const deleteRecord = (recordId) => {
    try {
        Record.deleteRecord(recordId);
    } catch (error) {
        throw error;
    }
};

module.exports = { 
    getRecordForWorkout,
    getAllRecords,
    getRecord,
    createNewRecord,
    updateRecord,
    deleteRecord
};
