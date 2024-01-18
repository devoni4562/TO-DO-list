const express = require('express');
const {setTask, getTasks, editTask, deleteTask} = require("../controllers/task.controller");
const router = express.Router();

router.get("/", getTasks);
router.post("/", setTask);
router.put("/:id", editTask);
router.delete("/:id", deleteTask);

module.exports = router;