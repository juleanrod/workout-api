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

const getRecord = (res, req) => {
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
        const record = workoutService.getOneWorkout(recordId);
        res.send({ status: "OK", data: record});
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

const createNewRecord = (res, req) => {
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
    getRecord,
    createNewRecord,
    updateRecord,
    deleteRecord,
}
