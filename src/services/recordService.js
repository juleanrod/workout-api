const Record = require("../database/Record");
const crypto = require("node:crypto");

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

const createNewRecord = (tempRecord) => {
    try {
        const newRecord = {
            id: crypto.randomUUID(),
            ...tempRecord,
        }
        const record = Record.createNewRecord(newRecord);
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
        const confirmation = Record.deleteRecord(recordId);
        return confirmation;
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
