const express = require('express');
const auth = require('../middleware/auth.middleware');
const {setTask, getTasks, editTask, deleteTask} = require("../controllers/task.controller");
const router = express.Router();

router.get("/", auth, getTasks);
router.post("/", auth, setTask);
router.put("/:id", auth, editTask);
router.delete("/:id", auth, deleteTask);

module.exports = router;