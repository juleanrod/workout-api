const recordService = require("../services/recordService");

const getAllRecords = (req, res) => {
    try {
        const allRecords = recordService.getAllRecords();
        res.send({ status: "OK", data: allRecords});
    } catch(error) {
        res.
            status(error?.status || 500).
            send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

const getRecordForWorkout = (req, res) => {
    const {
        params: { workoutId },
    } = req;

    if(!workoutId) {
        res
            .status(422)
            .send({
                status: "FAILED",
                data: { error: "Parameter '/:workoutId/record' can not be empty" },
            });
    }
    
    try {
        const workoutRecord = recordService.getRecordForWorkout(workoutId);
        res.send({ status: "OK", data: workoutRecord });
    } catch(error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

const getRecord = (req, res) => {
    console.log(req);
    const {
        params: { recordId },
    } = req;

    if (!recordId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter '/:recordId' can not be empty" },
            });
    }
    try {
        const record = recordService.getRecord(recordId);
        res.send({ status: "OK", data: record});
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

const createNewRecord = (req, res) => {
    const { body } = req;
    if(!body.id || !body.workout || !body.record) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error:
                    `One of the following keys is missing or is empty in request body:\
                    'id', 'mode', 'equipment', 'exercises', 'trainerTips'`,
                }
            });
        return;
    }
    const newRecord = {
        id: body.id,
        workout: body.workout,
        record: body.record,
    }

    try {
        const recordCreated = recordService.createNewRecord(newRecord);
        res
            .status(201)
            .send({
                status: "OK",
                data: recordCreated,
            });
    } catch(error) {
        res.
            status(error?.status || 500).
            send({ status: "FAILED", data: { error: error?.message || error } });
    } 

}

module.exports = {
    getAllRecords,
    getRecordForWorkout,
    getRecord,
    createNewRecord,
}
