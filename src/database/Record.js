const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

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
        const validRecord = DB.records.findIndex((oldRecord) => oldRecord.id === recordId) > -1;
        if (!validRecord) {
            throw {
                status: 400,
                message: `Record with the id '${recordId}' does not exist`,
            };
        }
        const recordToUpdate = DB.records.findIndex(oldRecord => oldRecord.id === recordId);
        // confirm is actually a new record by comparing time or reps
        const parseRecord = (r) => {
            if(r.includes(":")) {
                //implies is a time based record, returns array of [mins,secs]
                const minAndSecs = r.split(' ')[0].split(":").forEach(x => ~x);
                return minAndSecs;
            }
            // otherwise return the rep [value]
            return [~r.split(' ')[0]];

        }
        const compareRecords = (record1, record2) => {
            record1_parsed = parseRecord(record1);
            record2_parsed = parseRecord(record2);
            if(record1_parsed.length === 2 && record2_parsed.length === 2) {
                if(record1_parsed[0] > record2_parsed[0]) {
                    return false;
                } else if(record1_parsed[0] === record2_parsed[0]) {
                    if(record1_parsed[1] > record2_parsed[1]) return false;
                }
            } else if(record1_parsed.length === 1 && record2_parsed.length === 1) {
                if(record1_parsed[0] > record2_parsed[0]) return false;
            }
            return true;
        }

        if(compareRecords(DB.records[recordToUpdate].record, record.record)) {
            throw {
                status: 400,
                message: `Record does not beat previous record [${DB.records[recordToUpdate].record}]`,
            }
        }
        DB.records[recordToUpdate] = record;
        saveToDatabase(DB);
        return record;
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
