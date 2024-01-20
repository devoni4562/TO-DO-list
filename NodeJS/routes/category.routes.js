const express = require('express');
const auth = require('../middleware/auth.middleware');
const {getCategories, setCategory, editCategory, deleteCategory} = require("../controllers/category.controller");
const router = express.Router();

router.get("/", auth, getCategories);
router.post("/", auth, setCategory);
router.put("/:id", auth, editCategory);
router.delete("/:id", auth, deleteCategory);

module.exports = router;