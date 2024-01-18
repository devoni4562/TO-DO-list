const express = require('express');
const {getCategories, setCategory, editCategory, deleteCategory} = require("../controllers/category.controller");
const router = express.Router();

router.get("/", getCategories);
router.post("/", setCategory);
router.put("/:id", editCategory);
router.delete("/:id", deleteCategory);

module.exports = router;