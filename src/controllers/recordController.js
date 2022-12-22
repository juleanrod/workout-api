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
                    'id', 'workout', 'record'`,
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

const updateRecord = (req, res) => {
    const {
        body,
        params: { recordId },
    } = req;

    if (!recordId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':recordId' can not be empty" },
            });
        return;
    }

    if(!body.id || !body.workout || !body.record) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error:
                    `One of the following keys is missing or is empty in request body:\
                    'id', 'workout', 'record'`,
                }
            });
        return;
    }

    const toUpdateRecord = {
        id: body.id,
        workout: body.workout,
        record: body.record,
    }

    try {
        const updatedRecord = recordService.updateRecord(recordId, toUpdateRecord);
        res.send({ status: "OK", data: updatedRecord });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

const deleteRecord = (req, res) => {

    const {
        params: { recordId },
    } = req;
    if (!recordId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':recordId' can not be empty" },
            });
    }
    try {
        const confirmation = recordService.deleteRecord(recordId);
        res.status(200).send({ status: "OK", data: confirmation });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

module.exports = {
    getAllRecords,
    getRecordForWorkout,
    getRecord,
    createNewRecord,
    updateRecord,
    deleteRecord
}
