const express = require("express");
const recordController = require("../../controllers/recordController");

const router = express.Router();

router.get("/", recordController.getAllRecords);

router.get("/:recordId", recordController.getRecord);

router.post("/", recordController.createNewRecord);

router.patch("/:recordId", recordController.updateRecord);

router.delete("/recordId", recordController.deleteRecord);

module.exports = router;
